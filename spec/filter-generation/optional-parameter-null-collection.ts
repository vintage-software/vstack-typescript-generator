'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `namespace Services.Filters.Person
{
  public class ByIds
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly IEnumerable<int> ids;

    public ByIds(IEnumerable<int> ids = null)
    {
      this.ids = ids;
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

let expectedOutput = `export class PeopleByIdsPrimaryFilter extends PrimaryFilter<Person> {
  constructor(private ids: number[] = null) {
    super();
  }

  public getFilterName(): string {
    return 'ByIds';
  }

  public getParameters(): string[] {
    return [this.ids ? this.ids.map(i => i.toString()).join(',') : null];
  }

  protected __dummy(): Person {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with an optional collection parameter with null value correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
