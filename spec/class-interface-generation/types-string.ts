'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public string ThisString { get; set; }
    public String ThatString { get; set; }
    public Guid SomeGuid { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  thisString: string;
  thatString: string;
  someGuid: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate string types correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
