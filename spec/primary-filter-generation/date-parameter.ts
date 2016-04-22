/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

let sampleFile = `namespace Services.Filters.Person
{
    public class ByBirthdate
        : IPrimaryRestFilter<Dmn.Person, PersonMapper, Permissions>
    {
        private readonly DateTime birthdate;
        private readonly DateTime[] birthdates;

        public ByBirthdate(DateTime birthdate, DateTime[] birthdates)
        {
            this.birthdate = birthdate;
            this.birthdates = birthdates;
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

let expectedOutput = `class PeopleByBirthdateFilter implements IPrimaryFilter<Person> {
    constructor(private birthdate: Date, private birthdates: Date[]) {
    }

    public getFilterName(): string {
        return 'ByBirthdate';
    }

    public getParameters(): string[] {
        return [encodeUriComponent(this.birthdate.toISOString()), this.birthdates.map(i => encodeUriComponent(i.toISOString())).join(',')];
    }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should transform a filter with date parameters correctly', () => {
        let options = {
            dateTimeToDate: true
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
