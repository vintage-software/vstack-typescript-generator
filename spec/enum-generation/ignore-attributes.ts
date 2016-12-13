'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

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
    Violent
  }
}`;

let expectedOutput = `export enum Colors {
  Red = 0,
  Orange = 1,
  Yellow = 2,
  Green = 3,
  Blue = 4,
  Indigo = 5,
  Violent = 6
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should ignore attributes', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
