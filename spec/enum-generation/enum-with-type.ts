/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public enum MyEnum : System.Int64
    {
        Green,
		Red,
		Blue
        //Purple
        /* public string IgnoreMe3 {get; set; } */
        /*
        public string IgnoreMe4 {get; set; }
        */
        Pink = 10, Ultraviolet
    }
}`;

let expectedOutput = `declare enum MyEnum {
    Green = 0,
    Red = 1,
    Blue = 2,
    Pink = 10,
    Ultraviolet = 11
}`;

describe('vstack-typescript-generation enum generator', () => {
	it('should ignore an enum\'s explicit type', () => {
		let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
	});
});
