'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public int Id { get; private set; }
    public string Name { get; private set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  id: number;
  name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform a basic class with private setters', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});