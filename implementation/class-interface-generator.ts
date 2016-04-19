/// <reference path="utility.ts" />
/// <reference path="c-sharp-parser.ts" />

class ClassInterfaceGenerator {
    public static generate(input: string, options?: IClassInterfaceOptions): string {
        let result = CSharpParser.parse(input)
            .filter(type => type instanceof CSharpClassOrStruct)
            .map(type => ClassInterfaceGenerator.generateInterface(<CSharpClassOrStruct>type, options))
            .join('\n\n');

        return Utility.wrapResult(result, options);
    }

    private static generateInterface(type: CSharpClassOrStruct, options: IClassInterfaceOptions): string {
        let prefixWithI = options && options.prefixWithI;
        let ignoreInhertitance = options && options.ignoreInheritance && options.ignoreInheritance.indexOf(type.inherits) !== -1;

        let modifier = options && options.baseNamespace ? 'export ' : '';
        let tsInterfaceName = prefixWithI ? `I${type.name}` : type.name;
        let tsExtends = type.inherits && !ignoreInhertitance ? ` extends ${type.inherits}` : '';

        let propertyStrings: string[] = [];
        for (let property of type.properties) {
            let tsPropertyName = options && options.propertyNameResolver ? options.propertyNameResolver(property.name) : property.name;
            if (property.type.isNullable) {
                tsPropertyName += '?';
            }

            let tsType = Utility.translateType(property.type.name, options) || `${prefixWithI ? 'I' : ''}${property.type.name}`;
            if (property.type.isCollection) {
                tsType += '[]';
            }

            propertyStrings.push(`${tsPropertyName}: ${tsType}`);
        }

        return `${modifier}interface ${tsInterfaceName}${tsExtends} {\n    ${propertyStrings.join(';\n    ')};\n}`;
    }
}
