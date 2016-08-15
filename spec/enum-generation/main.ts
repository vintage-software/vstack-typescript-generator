'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public enum MyEnum
    {
        Green,
		Red,
		Blue
        //Purple
        /* public string IgnoreMe3 {get; set; } */
        /*
        public string IgnoreMe4 {get; set; }

        Ignore = 5
        */
        [SomeAttribute(64)]
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
    it('should transform an enum correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
