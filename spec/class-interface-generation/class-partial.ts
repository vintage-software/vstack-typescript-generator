'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public partial class PartialDto
  {
    public int PartialProperty { get; set; }
  }
}`;

const expectedOutput = `export interface PartialDto {
  partialProperty: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform partial classes', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
