/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../dist/index.js';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int SomeInt { get; set; }
    }
}`;

let expectedOutput = `module MyNamespace {
    export interface MyDto {
        SomeInt: number;
    }
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should use the baseNamespace option correctly', () => {
        let options =  {
            baseNamespace: 'MyNamespace'
        };

		let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
	});
});
