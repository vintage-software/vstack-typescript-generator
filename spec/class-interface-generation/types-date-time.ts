'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public DateTime SomeDate { get; set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  someDate: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate DateTime to string by default', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
