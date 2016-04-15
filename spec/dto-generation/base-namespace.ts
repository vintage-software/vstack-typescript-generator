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

    export enum MyEnum {
        One = 0,
        Two = 1
    }
}`;

describe('vstack-typescript-generation dto generator', () => {
	it('should use the baseNamespace option correctly', () => {
		let result = tsGenerator.generateDto(sampleFile, { baseNamespace: 'MyNamespace' });
        expect(result).toEqual(expectedOutput);
	});
});
