'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

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

let expectedOutput = `export interface MyDto {
  id: number;
  name?: string;
  age?: number;
  rank?: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should generate option properties when the allPropertiesOptional is set', () => {
    let options = {
      allPropertiesOptional: true
    };

    let result = tsGenerator(sampleFile, options);
    expect(result).toEqual(expectedOutput);
  });
});
