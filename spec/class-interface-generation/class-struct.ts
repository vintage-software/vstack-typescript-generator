'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public struct StructDto
  {
    public int StructProperty { get; set; }
  }
}`;

const expectedOutput = `export interface StructDto {
  structProperty: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform structs', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
