'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `namespace Services.Filters.Person
{
  public class ByNameAndAge
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly string name;
    private readonly int age;

    public ByNameAndAge(int age, string name = null)
    {
      this.name = name;
      this.ages = age;
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

let expectedOutput = `export class PeopleByNameAndAgePrimaryFilter extends PrimaryFilter<Person> {
  constructor(private age: number, private name: string = null) {
    super();
  }

  public getFilterName(): string {
    return 'ByNameAndAge';
  }

  public getParameters(): string[] {
    return [this.age.toString(), this.name ? encodeURIComponent(this.name) : null];
  }

  protected __dummy(): Person {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with an optional parameter with null value correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
