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
    public int Age { get; set; }
    public int? Rank { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  name?: string;
  age?: number;
  rank?: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should generate option properties when the allPropertiesOptional is set', () => {
    const options = {
      allPropertiesOptional: true
    };

    const result = tsgen(sampleFile, options);
    expect(result).toEqual(expectedOutput);
  });
});
