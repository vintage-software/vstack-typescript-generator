'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

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
    Violent = 64,
    All = 0x7FFFFFFF
  }
}`;

let expectedOutput = `export enum Colors {
  None = 0,
  Red = 1,
  Orange = 2,
  Yellow = 4,
  Green = 8,
  Blue = 16,
  Indigo = 32,
  Violent = 64,
  All = 2147483647
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should transform an enum with hex values correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
