/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int Id { get; set; }
        public string NameOfStuff { get; set; }
        public string Title { get; set; }
    }
}`;

let expectedOutput = `interface MyDto {
    id: number;
    nameOfStuff: string;
    title: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should handle the propertyNameResolver option correctly', () => {
        let options = {
            propertyNameResolver : camelCaseResolver
        };

        let result = tsGenerator.generateClassInterface(sampleFile, options);
        expect(result).toEqual(expectedOutput);

        function camelCaseResolver(propertyName) {
            return propertyName[0].toLowerCase() + propertyName.substring(1);
        }
    });
});
