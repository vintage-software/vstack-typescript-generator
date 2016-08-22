'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    public class ByBirthdate\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        private readonly DateTime birthdate;\n        private readonly DateTime[] birthdates;\n\n        public ByBirthdate(DateTime birthdate, DateTime[] birthdates)\n        {\n            this.birthdate = birthdate;\n            this.birthdates = birthdates;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "export class PeopleByBirthdateFilter implements IPrimaryFilter<Person> {\n    constructor(private birthdate: string, private birthdates: string[]) {\n    }\n\n    public getFilterName(): string {\n        return 'ByBirthdate';\n    }\n\n    public getParameters(): string[] {\n        return [encodeURIComponent(this.birthdate), this.birthdates.map(i => encodeURIComponent(i)).join(',')];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should transform a filter with date as string parameters correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=date-parameter-as-string.js.map