'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public abstract class MyDto : IMyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    id: number;
    name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should handle the ignoreInheritance option correctly', () => {
        let options = {
            ignoreInheritance: ['IMyDto']
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
