/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

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

let expectedOutput = `declare module MyNamespace {
    export interface MyDto {
        SomeInt: number;
    }
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should use the baseNamespace option correctly', () => {
		let result = tsGenerator.generateClassInterface(sampleFile, { baseNamespace: 'MyNamespace' });
        expect(result).toEqual(expectedOutput);
	});
});
