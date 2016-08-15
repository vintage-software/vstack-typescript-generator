'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public interface IMyDto
    {
        string Name { get; set; }
    }

    public abstract class MyDto : IMyDto
    {
        public string Name { get; set; }
    }
}`;

let expectedOutput = `interface MyDto {
    Name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should handle the ignore inheritance option correctly', () => {
        let options = {
            ignoreInheritance: ['IMyDto']
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
