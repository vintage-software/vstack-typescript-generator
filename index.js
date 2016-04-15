'use strict';

let fs = require('fs');
let typescript = require('typescript');

let tsCode = getDependenciesAndSelf('./implementation/index.ts')
    .map(filePath => fs.readFileSync(filePath).toString())
    .join('\n');

eval(typescript.transpile(tsCode));

function getDependenciesAndSelf(path) {
    let references = [];
    
    let file = fs.readFileSync(path).toString();
    let folder = path.substring(0, path.lastIndexOf('/'));
    
    let referenceMatch;
    let referenceRegex = /\/\/\/ <reference path="([a-z-/]+(?:.d)?.ts)" \/>/g;
    while (!!(referenceMatch = referenceRegex.exec(file))) {
        let reference = referenceMatch[1];
        references = getDependenciesAndSelf(`${folder}/${reference}`).concat(references);
    }
    
    references.push(path);
    return references;
}