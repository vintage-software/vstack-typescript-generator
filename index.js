'use strict';

let fs = require('fs');
let typescript = require('typescript');

let tsCode = getReferencesAndSelf('./implementation/index.ts')
    .map(filePath => fs.readFileSync(filePath).toString())
    .join('\n');

eval(typescript.transpile(tsCode));

function getReferencesAndSelf(filePath) {
    let references = [filePath];
    
    let file = fs.readFileSync(filePath).toString();
    let folder = filePath.substring(0, filePath.lastIndexOf('/'));
    
    let referenceMatch;
    let referenceRegex = /\/\/\/ <reference path="([a-z-/]+(?:.d)?.ts)" \/>/g;
    while (!!(referenceMatch = referenceRegex.exec(file))) {
        let reference = referenceMatch[1];
        references = getReferencesAndSelf(`${folder}/${reference}`).concat(references);
    }
    
    return references;
}
