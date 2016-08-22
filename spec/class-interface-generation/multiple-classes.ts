'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public partial class MyOtherDto
    {
        public int SomeField { get; set; }
    }

    public struct MyStruct
    {
        public int SomeIntField { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    id: number;
    name: string;
}

export interface MyOtherDto {
    someField: number;
}

export interface MyStruct {
    someIntField: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should handle multiple classes in the same file', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
