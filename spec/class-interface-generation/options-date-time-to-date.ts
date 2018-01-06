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
  someDate: Date;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate DateTime to Date when the dateTimeToDate option is set', () => {
    const options = {
      dateTimeToDate: true
    };

    const result = tsgen(sampleFile, options);
    expect(result).toEqual(expectedOutput);
  });
});
