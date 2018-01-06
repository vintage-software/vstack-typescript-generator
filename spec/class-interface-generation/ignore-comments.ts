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
    //public string IgnoreMe { get; set; }
    public string Info1 { get; set; }
    // public string IgnoreMe2 { get; set; }
    /* public string IgnoreMe3 { get; set; } */
    public string Info2 { get; set; }
    /*
    public string IgnoreMe4 { get; set; }
    */
    public string Info3 { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  name: string;
  info1: string;
  info2: string;
  info3: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should ignore comments', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
