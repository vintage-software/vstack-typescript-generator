'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    public class ByNameAndAge\n        : IPrimaryFilter<Dmn.Person, PersonMapper>\n    {\n        private readonly string name;\n        private readonly int age;\n\n        public ByNameAndAge(string name, int age)\n        {\n            this.name = name;\n            this.age = age;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should not transform a non dto filter', function () {
        var options = {
            moduleName: 'MyNamespace'
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=non-dto-filter.js.map