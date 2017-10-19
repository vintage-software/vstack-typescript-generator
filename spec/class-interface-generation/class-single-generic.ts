'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

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
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
