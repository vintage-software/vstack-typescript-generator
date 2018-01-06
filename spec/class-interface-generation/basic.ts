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
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform a basic class', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
