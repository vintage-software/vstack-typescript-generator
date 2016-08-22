'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public bool? OptionalBool {get; set;}
        public Nullable<int> OptionalInt {get; set;}
    }
}`;

let expectedOutput = `export interface MyDto {
    optionalBool?: boolean;
    optionalInt?: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should translate nullables correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
