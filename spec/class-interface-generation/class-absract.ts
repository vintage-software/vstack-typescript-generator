'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public abstract class MyDto
  {
    public string Name { get; set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform abstract classes', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
