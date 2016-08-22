'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public struct StructDto
    {
        public int StructProperty { get; set; }
    }
}`;

let expectedOutput = `export interface StructDto {
    structProperty: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should transform structs', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
