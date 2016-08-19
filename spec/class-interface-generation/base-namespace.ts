'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int SomeInt { get; set; }
    }
}`;

let expectedOutput = `module MyNamespace {
    export interface MyDto {
        someInt: number;
    }
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should use the baseNamespace option correctly', () => {
        let options = {
            baseNamespace: 'MyNamespace'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
