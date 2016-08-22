'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}`;

let expectedOutput = `export interface IMyDto {
    id: number;
    name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should prefix interface names with I when the prefixWithI option is set', () => {
        let options = {
            prefixWithI: true
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
