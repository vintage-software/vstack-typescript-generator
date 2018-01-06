'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `namespace Services.Filters.Person
{
  // ts-generator-ignore
  public class ByNameAndAge
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
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
  }
}

namespace Services.Filters.Person
{
  public class ByNameAndAge
    : IPrimaryDtoFilter<Dmn.Employee, EmployeeMapper, Permissions>
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

    public IQueryable<Dmn.Person> PrimaryFilter(EmployeeMapper mapper)
    {
      return something;
    }
  }
}`;

const expectedOutput = `export class EmployeesByNameAndAgePrimaryFilter extends PrimaryFilter<Employee> {
  constructor(private name: string, private age: number) {
    super();
  }

  public getFilterName(): string {
    return 'ByNameAndAge';
  }

  public getParameters(): string[] {
    return [encodeURIComponent(this.name), this.age.toString()];
  }

  protected __dummy(): Employee {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should ignore filters correctly', () => {
    const result = tsgen(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
