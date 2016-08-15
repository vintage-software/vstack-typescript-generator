'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "namespace Services.Filters.Person\n{\n    public class BySomeProperty\n        : IPrimaryDtoFilter<Dmn.Person, PersonMapper, Permissions>\n    {\n        private readonly dynamic property;\n        private readonly dynamic[] properties;\n\n        public BySomeProperty(dynamic property, dynamic[] properties)\n        {\n            this.property = property;\n            this.properties = properties;\n        }\n\n        public RestStatus HasPrimaryPermissions(Permissions permissions)\n        {\n            return RestStatus.Ok;\n        }\n\n        public IQueryable<Dmn.Person> PrimaryFilter(PersonMapper mapper)\n        {\n            return something;\n        }\n    }\n}";
var expectedOutput = "class PeopleBySomePropertyFilter implements IPrimaryFilter<Person> {\n    constructor(private property: any, private properties: any[]) {\n    }\n\n    public getFilterName(): string {\n        return 'BySomeProperty';\n    }\n\n    public getParameters(): string[] {\n        return [encodeURIComponent(this.property.toString()), this.properties.map(i => encodeURIComponent(i.toString())).join(',')];\n    }\n}";
describe('vstack-typescript-generation primary filter generator', function () {
    it('should transform a filter with dynamic parameters correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=dynamic-parameter.js.map