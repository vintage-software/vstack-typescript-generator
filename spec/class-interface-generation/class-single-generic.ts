'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto<T>
  {
    public T GenericTypeValue { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto<T> {
  genericTypeValue: T;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform a class with single generic type parameter correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
