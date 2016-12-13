'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

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
    Violent = 14
  }
}`;

let expectedOutput = `export enum Colors {
  Red = 2,
  Orange = 4,
  Yellow = 6,
  Green = 8,
  Blue = 10,
  Indigo = 12,
  Violent = 14
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should transform an enum with explicit values correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
