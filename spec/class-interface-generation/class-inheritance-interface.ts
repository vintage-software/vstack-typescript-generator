'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    id: number;
    name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should ignore interface inheritance', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
