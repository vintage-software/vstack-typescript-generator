/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../dist/index.js';

let sampleFile = `namespace Services.Filters.Person
{
    public class BySomeProperty
        : IPrimaryRestFilter<Dmn.Person, PersonMapper, Permissions>
    {
        private readonly dynamic property;
        private readonly dynamic[] properties;

        public BySomeProperty(dynamic property, dynamic[] properties)
        {
            this.property = property;
            this.properties = properties;
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

let expectedOutput = `class PeopleBySomePropertyFilter implements IPrimaryFilter<Person> {
    constructor(private property: any, private properties: any[]) {
    }

    public getFilterName(): string {
        return 'BySomeProperty';
    }

    public getParameters(): string[] {
        return [encodeURIComponent(this.property.toString()), this.properties.map(i => encodeURIComponent(i.toString())).join(',')];
    }
}`;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should transform a filter with dynamic parameters correctly', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
