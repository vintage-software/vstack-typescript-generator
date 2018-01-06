'use strict';

import 'jasmine';

import { tsgen } from '../../src/tsgen';

const sampleFile = `namespace Services.Filters.Person
{
    public class ByNameAndAge
        : IPrimaryFilter<Dmn.Person, PersonMapper>
    {
        private readonly string name;
        private readonly int age;

        public ByNameAndAge(string name, int age)
        {
            this.name = name;
            this.age = age;
        }

        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)
        {
            return something;
        }
    }
}`;

const expectedOutput = ``;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should not transform a non dto filter', () => {
        const result = tsgen(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
