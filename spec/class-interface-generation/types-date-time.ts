'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public DateTime SomeDate { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  someDate: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate DateTime to string by default', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
