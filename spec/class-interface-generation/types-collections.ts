'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public string[] StringArray { get; set; }
        public List<string> StringList { get; set; }
        public IEnumerable<string> StringIEnumerable { get; set; }

        public int[] IntArray { get; set; }
        public List<int> IntList { get; set; }
        public IEnumerable<int> IntIEnumerable { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    stringArray: string[];
    stringList: string[];
    stringIEnumerable: string[];
    intArray: number[];
    intList: number[];
    intIEnumerable: number[];
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should translate collections correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});