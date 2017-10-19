'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public dynamic ThisDynamic { get; set; }
    public JObject ThatJObject { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  thisDynamic: any;
  thatJObject: any;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate dynamic types correctly', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
