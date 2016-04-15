'use strict';

let fs = require('fs');
let typescript = require('typescript');

const tsFiles = [
    './implementation/index.ts'
];

tsFiles.forEach(file => { eval(typescript.transpile(fs.readFileSync(file).toString())) });