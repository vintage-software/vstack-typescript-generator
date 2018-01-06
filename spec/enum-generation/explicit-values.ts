'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public enum Colors
  {
    Red = 2,
    Orange = 4,
    Yellow = 6,
    Green = 8,
    Blue = 10,
    Indigo = 12,
    Violet = 14
  }
}`;

const expectedOutput = `export enum Colors {
  Red = 2,
  Orange = 4,
  Yellow = 6,
  Green = 8,
  Blue = 10,
  Indigo = 12,
  Violet = 14
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should transform an enum with explicit values correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
