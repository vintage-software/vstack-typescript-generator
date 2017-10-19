'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

const sampleFile = `namespace Services.Filters.Person
{
  public class ByNameAndAge
    : IBypassElasticDtoFilter<Dmn.Person, Permissions>
  {
    private readonly string name;
    private readonly int age;

    public ByNameAndAge(string name, int age)
    {
      this.name = name;
      this.age = age;
    }

    public IQueryable<Dmn.Person> Filter()
    {
      return something;
    }
  }
}`;

const expectedOutput = `export class PeopleByNameAndAgeBypassElasticFilter extends BypassElasticFilter<Person> {
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
  it('should transform a bypass elastic filter correctly', () => {
    const result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
