/// <reference path="enum-generator.ts" />
/// <reference path="class-interface-generator.ts" />
/// <reference path="primary-filter-generator.ts" />
declare var module: any;

module.exports = {
    generateEnum: EnumGenerator.generate,
    generateClassInterface: ClassInterfaceGenerator.generate,
    generatePrimaryFilter: PrimaryFilterGenerator.generate
};
