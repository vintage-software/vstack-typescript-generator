'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `namespace Services.Filters.Person
{
  public class ByNameAndAge
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>, IDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly string name;
    private readonly int age;

    public ByNameAndAge(string name, int age)
    {
      this.name = name;
      this.age = age;
    }

    public RestStatus HasPrimaryPermissions(Permissions permissions)
    {
      return RestStatus.Ok;
    }

    public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)
    {
      return something;
    }

    public IQueryable<Dmn.Person> Filter(IQueryable<Dmn.Person> domains)
    {
      return something;
    }
  }
}`;

const expectedOutput = `export class PeopleByNameAndAgeFilter extends Filter<Person> {
  constructor(private name: string, private age: number) {
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
}

export class PeopleByNameAndAgePrimaryFilter extends PrimaryFilter<Person> {
  constructor(private name: string, private age: number) {
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
  it('should transform a filter and primary filter combined correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
