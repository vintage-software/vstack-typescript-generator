'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public enum Colors
    {
        Red,
		// Orange,
		Yellow,
        /* Green, */
        Blue,
        /*
        Indigo,
        Violent,
        */
        Maroon
    }
}`;

let expectedOutput = `export enum Colors {
    Red = 0,
    Yellow = 1,
    Blue = 2,
    Maroon = 3
}`;

describe('vstack-typescript-generation enum generator', () => {
    it('should ignore comments', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
