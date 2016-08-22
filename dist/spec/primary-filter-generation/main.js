'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    public class ByNameAndAge\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        private readonly string name;\n        private readonly int age;\n\n        public ByNameAndAge(string name, int age)\n        {\n            this.name = name;\n            this.age = age;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "export class PeopleByNameAndAgeFilter implements IPrimaryFilter<Person> {\n    constructor(private name: string, private age: number) {\n    }\n\n    public getFilterName(): string {\n        return 'ByNameAndAge';\n    }\n\n    public getParameters(): string[] {\n        return [encodeURIComponent(this.name), this.age.toString()];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should transform a filter correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=main.js.map