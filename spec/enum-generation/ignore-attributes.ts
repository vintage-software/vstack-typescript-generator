'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public enum Colors
  {
    [RainbowColor]
    Red,
    [RainbowColor]
    Orange,
    [RainbowColor]
    Yellow,
    [RainbowColor]
    Green,
    [RainbowColor]
    Blue,
    [RainbowColor]
    Indigo,
    [RainbowColor]
    Violet
  }
}`;

const expectedOutput = `export enum Colors {
  Red = 0,
  Orange = 1,
  Yellow = 2,
  Green = 3,
  Blue = 4,
  Indigo = 5,
  Violet = 6
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should ignore attributes', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
