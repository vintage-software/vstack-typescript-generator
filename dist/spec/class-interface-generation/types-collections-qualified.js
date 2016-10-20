'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\nusing GenCol = System.Collections.Generic;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public IEnumerable<OtherDb.Dto.Widget> Widgets { get; set; }\n        public OtherDb.Dto.Widget[] ArrayOfWidgets { get; set; }\n        public System.Collections.Generic.IEnumerable<OtherDb.Dto.Widget> MoreWidgets { get; set; }\n        public GenCol.IEnumerable<OtherDb.Dto.Widget> EvenMoreWidgets { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    widgets: Widget[];\n    arrayOfWidgets: Widget[];\n    moreWidgets: Widget[];\n    evenMoreWidgets: Widget[];\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate collections correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-collections-qualified.js.map