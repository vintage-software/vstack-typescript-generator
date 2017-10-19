'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string _Meta { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  name: string;
  _meta: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform a underscore propertyies correctly', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
