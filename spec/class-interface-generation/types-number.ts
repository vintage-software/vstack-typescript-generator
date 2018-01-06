'use strict';

import 'jasmine';

import { tsGenerator } from '../../src/tsgen';

const sampleFile = `using System;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public byte ThisByte { get; set; }
    public Byte ThatByte { get; set; }

    public short ThisShort { get; set; }
    public Int16 ThatShort { get; set; }

    public int ThisInt { get; set; }
    public Int32 ThatInt { get; set; }

    public long ThisLong { get; set; }
    public Int64 ThatLong { get; set; }

    public float ThisSingle { get; set; }
    public Single ThatSingle { get; set; }

    public double ThisDouble { get; set; }
    public Double ThatDouble { get; set; }

    public decimal ThisDecimal { get; set; }
    public Decimal ThatDecimal { get; set; }
  }
}`;

const expectedOutput = `export interface MyDto {
  thisByte: number;
  thatByte: number;
  thisShort: number;
  thatShort: number;
  thisInt: number;
  thatInt: number;
  thisLong: number;
  thatLong: number;
  thisSingle: number;
  thatSingle: number;
  thisDouble: number;
  thatDouble: number;
  thisDecimal: number;
  thatDecimal: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate byte to number', () => {
    const options = {
      dateTimeToDate: true
    };

    const result = tsGenerator(sampleFile, options);
    expect(result).toEqual(expectedOutput);
  });
});
