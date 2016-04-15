/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

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

describe('vstack-typescript-generation dto generator', () => {
	it('should handle the ignore inheritance option correctly', () => {
        let options = {
            ignoreInheritance: ['IMyDto']
        };

		let result = tsGenerator.generateDto(sampleFile, options);
        expect(result).toEqual(expectedOutput);
	});
});
