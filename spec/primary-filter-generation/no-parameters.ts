/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../dist/index.js';

let sampleFile = `namespace Service.Filters.People
{
    public class WithCondition
        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>
    {
        public WithCondition()
        {
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

let expectedOutput = `class PeopleWithConditionFilter implements IPrimaryFilter<Person> {
    constructor() {
    }

    public getFilterName(): string {
        return 'WithCondition';
    }

    public getParameters(): string[] {
        return [];
    }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should transform a filter with zero parameters correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
