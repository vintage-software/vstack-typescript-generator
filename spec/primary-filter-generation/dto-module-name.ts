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
}`;

let expectedOutput = `export class PeopleByNameAndAgeFilter implements IPrimaryFilter<dto.Person> {
    constructor(private name: string, private age: number) {
    }

    public getFilterName(): string {
        return 'ByNameAndAge';
    }

    public getParameters(): string[] {
        return [encodeURIComponent(this.name), this.age.toString()];
    }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should use the dtoModuleName option correctly', () => {
        let options = {
            dtoModuleName: 'dto'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
