'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public dynamic ThisDynamic { get; set; }
    public JObject ThatJObject { get; set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  thisDynamic: any;
  thatJObject: any;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate dynamic types correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
