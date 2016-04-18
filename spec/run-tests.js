'use strict';

let fs = require('fs');
let typescript = require('typescript');

const testFolders = [
    './spec/enum-generation',
    './spec/class-interface-generation'
];

testFolders.forEach(folder => {
    let testFiles = fs.readdirSync(folder);
    testFiles.forEach(file => { eval(typescript.transpile(fs.readFileSync(`${folder}/${file}`).toString())) });
});
