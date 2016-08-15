'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    public class ByBirthdate\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        private readonly DateTime birthdate;\n        private readonly DateTime[] birthdates;\n\n        public ByBirthdate(DateTime birthdate, DateTime[] birthdates)\n        {\n            this.birthdate = birthdate;\n            this.birthdates = birthdates;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "class PeopleByBirthdateFilter implements IPrimaryFilter<Person> {\n    constructor(private birthdate: Date, private birthdates: Date[]) {\n    }\n\n    public getFilterName(): string {\n        return 'ByBirthdate';\n    }\n\n    public getParameters(): string[] {\n        return [encodeURIComponent(this.birthdate.toISOString()), this.birthdates.map(i => encodeURIComponent(i.toISOString())).join(',')];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should transform a filter with date parameters correctly', function () {
        var options = {
            dateTimeToDate: true
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=date-parameter.js.map