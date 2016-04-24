/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../dist/index.js';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public enum MyEnum
    {
        One, Two
    }
}`;

let expectedOutput = `module MyNamespace {
    export enum MyEnum {
        One = 0,
        Two = 1
    }
}`;

describe('vstack-typescript-generation enum generator', () => {
	it('should use the baseNamespace option correctly', () => {
        let options =  {
            baseNamespace: 'MyNamespace'
        };

		let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
	});
});
