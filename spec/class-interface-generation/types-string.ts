'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public string ThisString { get; set; }
        public String ThatString { get; set; }
        public Guid SomeGuid { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    thisString: string;
    thatString: string;
    someGuid: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should translate string types correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
