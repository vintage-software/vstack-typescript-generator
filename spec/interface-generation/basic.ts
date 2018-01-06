'use strict';

import 'jasmine';

import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public interface IWhatever
  {
    int Weight { get; set; }
    string Name { get; set; }
  }
}`;

const expectedOutput = `export interface IWhatever {
  weight: number;
  name: string;
}`;

describe('vstack-typescript-generation interface generator', () => {
  it('should transform a basic interface', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
