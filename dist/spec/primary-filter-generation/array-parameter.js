'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    public class ByNamesAndAges\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        private readonly string[] names;\n        private readonly int[] ages;\n\n        public ByNamesAndAges(string[] names, int[] ages)\n        {\n            this.names = names;\n            this.ages = ages;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "class PeopleByNamesAndAgesFilter implements IPrimaryFilter<Person> {\n    constructor(private names: string[], private ages: number[]) {\n    }\n\n    public getFilterName(): string {\n        return 'ByNamesAndAges';\n    }\n\n    public getParameters(): string[] {\n        return [this.names.map(i => encodeURIComponent(i)).join(','), this.ages.map(i => i.toString()).join(',')];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should transform a filter with array parameters correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=array-parameter.js.map