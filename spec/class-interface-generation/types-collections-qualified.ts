'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `using System;
using GenCol = System.Collections.Generic;

namespace MyNamespace.Domain
{
  public class MyDto
  {
    public IEnumerable<OtherDb.Dto.Widget> Widgets { get; set; }
    public OtherDb.Dto.Widget[] ArrayOfWidgets { get; set; }
    public System.Collections.Generic.IEnumerable<OtherDb.Dto.Widget> MoreWidgets { get; set; }
    public GenCol.IEnumerable<OtherDb.Dto.Widget> EvenMoreWidgets { get; set; }
  }
}`;

let expectedOutput = `export interface MyDto {
  widgets: Widget[];
  arrayOfWidgets: Widget[];
  moreWidgets: Widget[];
  evenMoreWidgets: Widget[];
}`;

describe('vstack-typescript-generation class interface generator', () => {
  it('should translate collections correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
