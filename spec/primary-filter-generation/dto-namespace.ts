/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

let sampleFile = `namespace Services.Filters.Person
{
    public class ByNameAndAge
        : IPrimaryRestFilter<Dmn.Person, PersonMapper, Permissions>
    {
        private readonly string name;
        private readonly int age;

        public ByNameAndAge(string name, int age)
        {
            this.name = name;
            this.age = age;
        }

        public RestStatus HasPrimaryPermissions(Permissions permissions, DeletedState deletedState)
        {
            return RestStatus.Ok;
        }

        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper, DeletedState deletedState)
        {
            return something;
        }
    }
}`;

let expectedOutput = `class PeopleByNameAndAgeFilter implements IPrimaryFilter<dto.Person> {
    constructor(private name: string, private age: number) {
    }

    public getFilterName(): string {
        return 'ByNameAndAge';
    }

    public getParameters(): string[] {
        return [encodeUriComponent(this.name), this.age.toString()];
    }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should use the dtoNamespace option correctly', () => {
        let options = {
            dtoNamespace: 'dto'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
