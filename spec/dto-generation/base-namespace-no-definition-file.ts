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

let expectedOutput = `module MyNamespace {
    export interface MyDto {
        SomeInt: number;
    }

    export enum MyEnum {
        One = 0,
        Two = 1
    }
}`;

describe('vstack-typescript-generation dto generator', () => {
	it('should not use declare if there is no definition file', () => {
        let options = {
            baseNamespace: 'MyNamespace',
            definitionFile: false
        };

		let result = tsGenerator.generateDto(sampleFile, options);
        expect(result).toEqual(expectedOutput);
	});
});
