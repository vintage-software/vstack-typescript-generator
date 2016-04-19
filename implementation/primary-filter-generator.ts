/// <reference path="utility.ts" />
/// <reference path="c-sharp-parser.ts" />
declare var require: (name: string) => any;

let pluralize = require('pluralize'); // import not working

class PrimaryFilterGenerator {
    public static generate(input: string, options?: IPrimaryFilterOptions): string {
        let result = CSharpParser.parse(input)
            .filter(type => type instanceof CSharpClassOrStruct)
            .filter(type => !!type.inherits.match(/^IPrimaryRestFilter<Dmn.([\w]+)/))
            .filter(type => (<CSharpClassOrStruct>type).constructors.length === 1)
            .map(type => PrimaryFilterGenerator.generateFilter(<CSharpClassOrStruct>type, options))
            .join('\n\n');

        return Utility.wrapResult(result, options);
    }

    private static generateFilter(type: CSharpClassOrStruct, options: IPrimaryFilterOptions): string {
        let filterGroup = pluralize(type.namespace.match(/\.([\w_]+)$/)[1]);
        let domainType = type.inherits.match(/^IPrimaryRestFilter<Dmn.([\w]+)/)[1];
        let filterType = options && options.dtoNamespace ? `${options.dtoNamespace}.${domainType}` : domainType;

        let tsConstructorParams = type.constructors[0].parameters
            .map(parameter => {
                let tsParameterType = Utility.translateType(parameter.type.name, options);
                if (parameter.type.isCollection) {
                    tsParameterType += '[]';
                }

                return `private ${parameter.name}: ${tsParameterType}`;
            });

        let filterParams = type.constructors[0].parameters
            .map(parameter => {
                let convertToString = '';
                if (parameter.type.isCollection) {
                    convertToString = `.join(',')`;
                } else if (parameter.type.name !== 'string') {
                    convertToString = `.toString()`;
                }
                return `this.${parameter.name}${convertToString}`;
            });

        let result = '';
        result += `class ${filterGroup}${type.name}Filter implements IPrimaryFilter<${filterType}> {\n`;
        result += `    constructor(${tsConstructorParams.join(', ')}) {\n`;
        result += `    }\n\n`;

        result += `    public getFilterName(): string {\n`;
        result += `        return '${type.name}';\n`;
        result += `    }\n\n`;

        result += `    public getParameters(): string[] {\n`;
        result += `        return [${filterParams.join(', ')}];\n`;
        result += `    }\n`;
        result += `}`;
        return result;
    }
}
