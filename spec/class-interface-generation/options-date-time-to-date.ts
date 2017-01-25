'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public DateTime SomeDate { get; set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  someDate: Date;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate DateTime to Date when the dateTimeToDate option is set', () => {
    let options = {
      dateTimeToDate: true
    };

    let result = tsGenerator(sampleFile, options);
    expect(result).toEqual(expectedOutput);
  });
});
