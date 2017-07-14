import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(input, output, opts = { }) {
    return (t) => postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

function dedent(s) {
    return s.replace(/\n/g, ' ').replace(/\s{4}/g, '');
}

const exampleRule = dedent(`@font-face {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 300;
}`);

test('removes all rules when * is used', run(
    exampleRule,
    '',
    { 'font-face': '*' }
));

test('removes only the specified rule, no array', run(
    exampleRule,
    '@font-face { font-family: Open Sans; font-style: normal; }',
    { 'font-face': 'font-weight' }
));

test('removes only the specified rules, with array', run(
    exampleRule,
    '@font-face { font-family: Open Sans; }',
    { 'font-face': ['font-style', 'font-weight'] }
));
