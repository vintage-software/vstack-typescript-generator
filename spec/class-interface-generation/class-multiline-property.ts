'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public string Title
    {
      get;
      set;
    }
  }
}`;

let expectedOutput = `export interface MyDto {
  title: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should handle a multiline property correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
