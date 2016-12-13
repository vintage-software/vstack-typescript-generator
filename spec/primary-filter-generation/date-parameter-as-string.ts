'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `namespace Services.Filters.Person
{
  public class ByBirthdate
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly DateTime birthdate;
    private readonly DateTime[] birthdates;

    public ByBirthdate(DateTime birthdate, DateTime[] birthdates)
    {
      this.birthdate = birthdate;
      this.birthdates = birthdates;
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

let expectedOutput = `export class PeopleByBirthdateFilter implements IPrimaryFilter<Person> {
  constructor(private birthdate: string, private birthdates: string[]) {
  }

  public getFilterName(): string {
    return 'ByBirthdate';
  }

  public getParameters(): string[] {
    return [encodeURIComponent(this.birthdate), this.birthdates.map(i => encodeURIComponent(i)).join(',')];
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with date as string parameters correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
