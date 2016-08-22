'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public enum Colors
    {
        Red,
		Orange,
		Yellow = 5,
        Green = 7,
        Blue,
        Indigo,
        Violent = 12
    }
}`;

let expectedOutput = `export enum Colors {
    Red = 0,
    Orange = 1,
    Yellow = 5,
    Green = 7,
    Blue = 8,
    Indigo = 9,
    Violent = 12
}`;

describe('vstack-typescript-generation enum generator', () => {
    it('should transform an enum with explicit and auto-incremented values correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
