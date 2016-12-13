'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class ThisDto
  {
    public int Id { get; set; }
    public string ThisName { get; set; }
  }

  public class ThatDto
  {
    public int Id { get; set; }
    public string ThatName { get; set; }
  }
}`;

let expectedOutput = `export interface ThisDto {
  id: number;
  thisName: string;
}

export interface ThatDto {
  id: number;
  thatName: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform multiple classes in the same file', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
