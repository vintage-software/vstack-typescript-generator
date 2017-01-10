'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `namespace Services.Filters.Person
{
    public class ByNameAndAge
        : PrimaryFilter<Dmn.Person, PersonMapper>
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

let expectedOutput = ``;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should not transform a non dto filter', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
