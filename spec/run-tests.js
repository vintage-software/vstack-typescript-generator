'use strict';

let fs = require('fs');
let typescript = require('typescript');

const testFolders = [
    
];

testFolders.forEach(folder => {
    let testFiles = fs.readdirSync(folder);
    testFiles.forEach(file => { eval(typescript.transpile(fs.readFileSync(`${folder}/${file}`).toString())) });
});