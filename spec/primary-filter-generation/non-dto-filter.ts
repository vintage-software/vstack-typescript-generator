'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `namespace Services.Filters.Person
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

let expectedOutput = ``;

describe('vstack-typescript-generation primary filter generator', () => {
    it('should not transform a non dto filter', () => {
        let options = {
            moduleName: 'MyNamespace'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
