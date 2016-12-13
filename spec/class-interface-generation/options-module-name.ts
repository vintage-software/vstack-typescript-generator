'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}`;

let expectedOutput = `module MyNamespace {
  export interface MyDto {
    id: number;
    name: string;
  }
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should use the moduleName option correctly', () => {
    let options = {
      moduleName: 'MyNamespace'
    };

    let result = tsGenerator(sampleFile, options);
    expect(result).toEqual(expectedOutput);
  });
});
