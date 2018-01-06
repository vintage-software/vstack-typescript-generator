'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public MyDto()
    {
    }

    public MyDto(RichObject value)
    {
      this.Id = value.Id;
      this.Name = value.Name;
      this.Title = value.Title;
    }

    public int Id { get; set; }
    public string Name { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  name: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should ignore contructors', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
