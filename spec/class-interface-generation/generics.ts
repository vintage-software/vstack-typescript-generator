'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto<T>
    {
        public T GenericTypeValue {get;set;}
    }
}`;

let expectedOutput = `interface MyDto<T> {
    GenericTypeValue: T;
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should transform a dto with a single generic type correctly', () => {
		let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
	});
});
