'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public abstract class MyDto
  {
    public string Name { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform abstract classes', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
