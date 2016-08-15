'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Service.Filters.People\n{\n    public class WithCondition\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        public WithCondition()\n        {\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "class PeopleWithConditionFilter implements IPrimaryFilter<Person> {\n    constructor() {\n    }\n\n    public getFilterName(): string {\n        return 'WithCondition';\n    }\n\n    public getParameters(): string[] {\n        return [];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should transform a filter with zero parameters correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=no-parameters.js.map