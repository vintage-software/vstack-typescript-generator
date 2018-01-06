'use strict';

import 'jasmine';

import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public bool ThisBit { get; set; }
    public Boolean ThatBit { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  thisBit: boolean;
  thatBit: boolean;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate boolean types correctly', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
