var postcss = require('postcss');

module.exports = postcss.plugin('remove-rules', function (rulesToRemove) {
    return function (css) {
        if (!rulesToRemove) {
            return;
        }

        css.walkAtRules(function (rule) {
            var excludes = rulesToRemove[rule.name];
            if (!excludes) {
                return;
            }

            // One or more rules should be removed
            if (excludes === '*') {
                // Remove this entire rule
                rule.remove();
                return;
            }

            if (typeof excludes === 'string') {
                excludes = [excludes];
            }

            rule.walkDecls(function (decl) {
                if (excludes.indexOf(decl.prop) !== -1) {
                    decl.remove();
                }
            });
        });
    };
});
