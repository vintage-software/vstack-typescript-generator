'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public bool ThisBit { get; set; }
    public Boolean ThatBit { get; set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  thisBit: boolean;
  thatBit: boolean;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate boolean types correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
