'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    private int? id;

    public int Id
    {
      get
      {
        if (this.id == null)
        {
          this.id = this.UserId.GetHashCode();
        }

        return this.id.Value;
      }
      set
      {
        this.id = value;
      }
    }

    public string UserId { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  id: number;
  userId: string;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should transform a basic class with implemented getters', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
