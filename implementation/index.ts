/// <reference path="enum-generator.ts" />
/// <reference path="class-interface-generator.ts" />
declare var module: any;

module.exports = {
    generateEnum: EnumGenerator.generate,
    generateClassInterface: ClassInterfaceGenerator.generate
};
