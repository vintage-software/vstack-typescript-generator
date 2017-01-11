'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `namespace Services.Filters.Person
{
  public class ByNamesAndAges
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly string[] names;
    private readonly int[] ages;

    public ByNamesAndAges(NameService service, string[] names, int[] ages)
    {
      this.names = names;
      this.ages = ages;
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

let expectedOutput = `export class PeopleByNamesAndAgesPrimaryFilter extends PrimaryFilter<Person> {
  constructor(private names: string[], private ages: number[]) {
    super();
  }

  public getFilterName(): string {
    return 'ByNamesAndAges';
  }

  public getParameters(): string[] {
    return [this.names.map(i => encodeURIComponent(i)).join(','), this.ages.map(i => i.toString()).join(',')];
  }

  protected __dummy(): Person {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with injected parameters correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
