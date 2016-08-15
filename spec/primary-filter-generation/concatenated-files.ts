/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../dist/index.js';

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
}

namespace Services.Filters.Person
{
    public class ByNameAndAge
        : IPrimaryDtoFilter<Dmn.Employee, EmployeeMapper, Permissions>
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

        public IQueryable<Dmn.Person> PrimaryFilter(EmployeeMapper mapper)
        {
            return something;
        }
    }
}`;

let expectedOutput = `class PeopleByNameAndAgeFilter implements IPrimaryFilter<Person> {
    constructor(private name: string, private age: number) {
    }

    public getFilterName(): string {
        return 'ByNameAndAge';
    }

    public getParameters(): string[] {
        return [encodeURIComponent(this.name), this.age.toString()];
    }
}

class EmployeesByNameAndAgeFilter implements IPrimaryFilter<Employee> {
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
    it('should transform a filter correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
