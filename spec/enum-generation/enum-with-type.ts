'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public enum Colors : long
  {
    Red,
    Orange,
    Yellow,
    Green,
    Blue,
    Indigo,
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
  it('should ignore an enum\'s explicit type', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
