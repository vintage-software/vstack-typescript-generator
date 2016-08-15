'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public string NameOfStuff { get; set; }\n        public string Title { get; set; }\n    }\n}";
var expectedOutput = "interface MyDto {\n    id: number;\n    nameOfStuff: string;\n    title: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should handle the propertyNameResolver option correctly', function () {
        var options = {
            propertyNameResolver: camelCaseResolver
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
        function camelCaseResolver(propertyName) {
            return propertyName[0].toLowerCase() + propertyName.substring(1);
        }
    });
});
//# sourceMappingURL=property-name-resolver.js.map