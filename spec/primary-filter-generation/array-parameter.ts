/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

let sampleFile = `namespace Services.Filters.Person
{
    public class ByNameAndAges
        : IPrimaryRestFilter<Dmn.Person, PersonMapper, Permissions>
    {
        private readonly string name;
        private readonly int[] ages;

        public ByNameAndAges(string name, int[] ages)
        {
            this.name = name;
            this.ages = ages;
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

let expectedOutput = `class PeopleByNameAndAgesFilter implements IPrimaryFilter<Person> {
    constructor(private name: string, private ages: number[]) {
    }

    public getFilterName(): string {
        return 'ByNameAndAges';
    }

    public getParameters(): string[] {
        return [this.name, this.ages.join(',')];
    }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should transform a filter with array parameters correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
