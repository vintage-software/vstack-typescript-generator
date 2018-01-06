'use strict';

import 'jasmine';

import { tsGenerator } from '../../src/tsgen';

const sampleFile = `namespace Services.Filters.Person
{
  public class ByIds
    : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
  {
    private readonly int[] ids;

    public ByIds(int[] ids = null)
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

const expectedOutput = `export class PeopleByIdsPrimaryFilter extends PrimaryFilter<Person> {
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
  it('should transform a filter with an optional array parameter with null value correctly', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
