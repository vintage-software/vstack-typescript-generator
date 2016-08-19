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

    public enum MyEnum
    {
        One, Two
    }
}`;

let expectedOutput = `module MyNamespace {
    export interface MyDto {
        someInt: number;
    }

    export enum MyEnum {
        One = 0,
        Two = 1
    }
}`;

describe('vstack-typescript-generation enum generator', () => {
    it('should use the baseNamespace option correctly', () => {
        let options = {
            baseNamespace: 'MyNamespace'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
