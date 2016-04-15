'use strict';

let fs = require('fs');
let typescript = require('typescript');

let fileContentsCache = {};

let tsCode = getReferencesAndSelf('./implementation/index.ts')
    .map(filePath => fileContentsCache[filePath])
    .join('\n');

eval(typescript.transpile(tsCode));

function getReferencesAndSelf(filePath) {
    let references = [filePath];
    
    let folder = filePath.substring(0, filePath.lastIndexOf('/'));
    
    let fileContents = fs.readFileSync(filePath).toString();
    fileContentsCache[filePath] = fileContents;
    
    let referenceMatch;
    let referenceRegex = /\/\/\/ <reference path="([a-z-/]+(?:.d)?.ts)" \/>/g;
    while (!!(referenceMatch = referenceRegex.exec(fileContents))) {
        let reference = referenceMatch[1];
        references = getReferencesAndSelf(`${folder}/${reference}`).concat(references);
    }
    
    return references;
}
