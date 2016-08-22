'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    // ts-generator-ignore\n    public class ByNameAndAge\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        private readonly string name;\n        private readonly int age;\n\n        public ByNameAndAge(string name, int age)\n        {\n            this.name = name;\n            this.age = age;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}\n\nnamespace Services.Filters.Person\n{\n    public class ByNameAndAge\n        : IPrimaryDtoFilter<Dmn.Employee, EmployeeMapper, Permissions>\n    {\n        private readonly string name;\n        private readonly int age;\n\n        public ByNameAndAge(string name, int age)\n        {\n            this.name = name;\n            this.age = age;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(EmployeeMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "export class EmployeesByNameAndAgeFilter implements IPrimaryFilter<Employee> {\n    constructor(private name: string, private age: number) {\n    }\n\n    public getFilterName(): string {\n        return 'ByNameAndAge';\n    }\n\n    public getParameters(): string[] {\n        return [encodeURIComponent(this.name), this.age.toString()];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should ignore filters correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=concatenated-files-with-ignore.js.map