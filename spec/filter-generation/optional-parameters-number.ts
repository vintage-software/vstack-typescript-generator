'use strict';

import 'jasmine';

import { tsGenerator } from '../../src/tsgen';

const sampleFile = `namespace Services.Filters.Person
{
  public class ByNameAndAge
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly string name;
    private readonly int age;

    public ByNameAndAge(string name, int age = 18)
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

const expectedOutput = `export class PeopleByNameAndAgePrimaryFilter extends PrimaryFilter<Person> {
  constructor(private name: string, private age: number = 18) {
    super();
  }

  public getFilterName(): string {
    return 'ByNameAndAge';
  }

  public getParameters(): string[] {
    return [encodeURIComponent(this.name), this.age.toString()];
  }

  protected __dummy(): Person {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with an optional parameter with number value correctly', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
