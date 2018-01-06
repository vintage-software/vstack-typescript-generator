'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public enum Colors
  {
    Red,
    // Orange,
    Yellow,
    /* Green, */
    Blue,
    /*
    Indigo,
    Violet,
    */
    Maroon
  }
}`;

const expectedOutput = `export enum Colors {
  Red = 0,
  Yellow = 1,
  Blue = 2,
  Maroon = 3
}`;

describe('vstack-typescript-generation enum generator', () => {
  it('should ignore comments', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
