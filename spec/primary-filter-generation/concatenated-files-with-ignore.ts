/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../dist/index.js';

let sampleFile = `namespace Services.Filters.Person
{
    // ts-generator-ignore
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

        public RestStatus HasPrimaryPermissions(Permissions permissions, DeletedState deletedState)
        {
            return RestStatus.Ok;
        }

        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper, DeletedState deletedState)
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

        public RestStatus HasPrimaryPermissions(Permissions permissions, DeletedState deletedState)
        {
            return RestStatus.Ok;
        }

        public IQueryable<Dmn.Person> PrimaryFilter(EmployeeMapper mapper, DeletedState deletedState)
        {
            return something;
        }
    }
}`;

let expectedOutput = `class EmployeesByNameAndAgeFilter implements IPrimaryFilter<Employee> {
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
