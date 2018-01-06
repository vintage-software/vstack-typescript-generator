'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public bool? OptionalBool {get; set;}
    public Nullable<int> OptionalInt {get; set;}
  }
}`;

const expectedOutput = `export interface MyDto {
  optionalBool?: boolean;
  optionalInt?: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate nullables correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
