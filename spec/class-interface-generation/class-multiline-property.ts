'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

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

const expectedOutput = `export interface MyDto {
  title: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should handle a multiline property correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
