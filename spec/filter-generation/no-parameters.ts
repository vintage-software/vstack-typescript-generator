'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `namespace Service.Filters.People
{
    public class WithCondition
        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
    {
        public WithCondition()
        {
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

const expectedOutput = `export class PeopleWithConditionPrimaryFilter extends PrimaryFilter<Person> {
  constructor() {
    super();
  }

  public getFilterName(): string {
    return 'WithCondition';
  }

  public getParameters(): string[] {
    return [];
  }

  protected __dummy(): Person {
    return null;
  }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should transform a filter with zero parameters correctly', () => {
        const result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
