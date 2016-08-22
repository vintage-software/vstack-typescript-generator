'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int Id { get; set; }
        public DateTime SomeDate { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    id: number;
    someDate: Date;
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should turn DateTime into Date with option set', () => {
        let options = {
            dateTimeToDate: true
        };

		let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
	});
});
