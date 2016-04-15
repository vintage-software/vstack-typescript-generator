'use strict';

let fs = require('fs');
let typescript = require('typescript');

const tsFiles = [
    './implementation/utility.ts',
    './implementation/dto-generator.ts',
    './implementation/index.ts'
];

let tsCode = tsFiles
    .map(file => fs.readFileSync(file).toString())
    .join('\n');

eval(typescript.transpile(tsCode));
