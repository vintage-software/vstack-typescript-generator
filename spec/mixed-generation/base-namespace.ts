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

    public enum Colors
    {
        One, Two
    }
}`;

let expectedOutput = `module MyNamespace {
    export interface MyDto {
        someInt: number;
    }

    export enum Colors {
        One = 0,
        Two = 1
    }
}`;

describe('vstack-typescript-generation enum generator', () => {
    it('should use the moduleName option correctly', () => {
        let options = {
            moduleName: 'MyNamespace'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
