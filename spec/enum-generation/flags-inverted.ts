'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public enum Colors
  {
    None = 0
    Red = 1,
    Orange = 2,
    Yellow = 4,
    Green = 8,
    Blue = 16,
    Indigo = 32,
    Violet = 64,
    All = ~None,
    Random = ~64,
    Random2 = ~Random,
    Random3 = ~0xFF
  }
}`;

const expectedOutput = `export enum Colors {
  None = 0,
  Red = 1,
  Orange = 2,
  Yellow = 4,
  Green = 8,
  Blue = 16,
  Indigo = 32,
  Violet = 64,
  All = -1,
  Random = -65,
  Random2 = 64,
  Random3 = -256
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should transform an enum with inverted values correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
