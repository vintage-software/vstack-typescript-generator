/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public abstract class MyDto
    {
        public string Name { get; set; }
    }
}`;

let expectedOutput = `interface MyDto {
    Name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should transform an abstract class correctly', () => {
		let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
	});
});
