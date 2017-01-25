export interface MyDto {
  id: number;
  name: string;
}'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public partial class PartialDto
  {
    public int PartialProperty { get; set; }
  }
}`;

let expectedOutput = `export interface PartialDto {
  partialProperty: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform partial classes', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
