'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto : BaseDto, IDto, IOtherDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto extends BaseDto {
    id: number;
    name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should turn inheritence into extends', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
