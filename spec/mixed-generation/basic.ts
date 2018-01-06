'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }

  public enum Colors
  {
    Green,
    Blue
  }
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  name: string;
}

export enum Colors {
  Green = 0,
  Blue = 1
}`;

describe('vstack-typescript-generation', () => {
  it('should handle enums and classes in the same file', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
