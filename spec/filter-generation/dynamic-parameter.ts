'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `namespace Services.Filters.Person
{
  public class BySomeProperty
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly dynamic property;
    private readonly dynamic[] properties;

    public BySomeProperty(dynamic property, dynamic[] properties)
    {
      this.property = property;
      this.properties = properties;
    }

    public RestStatus HasPrimaryPermissions(Permissions permissions)
    {
      return RestStatus.Ok;
    }

    public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)
    {
      return something;
    }
  }
}`;

let expectedOutput = `export class PeopleBySomePropertyPrimaryFilter extends PrimaryFilter<Person> {
  constructor(private property: any, private properties: any[]) {
    super();
  }

  public getFilterName(): string {
    return 'BySomeProperty';
  }

  public getParameters(): string[] {
    return [encodeURIComponent(this.property.toString()), this.properties.map(i => encodeURIComponent(i.toString())).join(',')];
  }

  protected __dummy(): Person {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with dynamic parameters correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
