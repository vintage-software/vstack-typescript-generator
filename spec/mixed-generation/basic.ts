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

    public enum Colors
    {
        Green,
        Blue
    }
}`;

let expectedOutput = `export interface MyDto {
    id: number;
    name: string;
}

export enum Colors {
    Green = 0,
    Blue = 1
}`;

describe('vstack-typescript-generation', () => {
    it('should handle enums and classes in the same file', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
