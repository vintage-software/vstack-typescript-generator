'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public int Id { get; set; }
        public byte ThisByte { get; set; }
        public Byte ThatByte { get; set; }
    }
}`;

let expectedOutput = `export interface MyDto {
    id: number;
    thisByte: number;
    thatByte: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should translate byte to number', () => {
        let options = {
            dateTimeToDate: true
        };

		let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
	});
});
