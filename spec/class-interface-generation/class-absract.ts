'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

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
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
