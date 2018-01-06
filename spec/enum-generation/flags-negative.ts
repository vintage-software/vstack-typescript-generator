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
    All = -1
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
  All = -1
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should transform an enum with negative values correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
