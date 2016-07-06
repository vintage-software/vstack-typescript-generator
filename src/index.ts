/// <reference path="options.ts" />
/// <reference path="utility.ts" />
/// <reference path="c-sharp-parser.ts" />
'use strict';

declare var module: any;
declare var require: (i: string) => any;

let pluralize = require('pluralize'); // import not working

const primaryFilterRegex = /^(?:IPrimaryRestFilter|BasePrimaryUndeletedFilter|BasePrimaryFilter)<Dmn.([\w]+)/;

module.exports = function (input: string, options: IOptions) {
    if (input.indexOf('ts-generator-ignore') === -1) {
        let results: string[] = [];

        let types = CSharpParser.parse(input);
        for (let type of types) {
            let isPrimaryFilter = type.inherits && !!type.inherits.match(primaryFilterRegex);

            if (type instanceof CSharpEnum) {
                results.push(generateEnum(<CSharpEnum>type, options));
            } else if (type instanceof CSharpClassOrStruct && !isPrimaryFilter) {
                results.push(generateInterface(<CSharpClassOrStruct>type, options));
            } else if (type instanceof CSharpClassOrStruct && isPrimaryFilter) {
                results.push(generatePrimaryFilter(<CSharpClassOrStruct>type, options));
            }
        }

        let result = results.join('\n\n');

        if (options && options.baseNamespace) {
            let indentedResult = result
                .split('\n')
                .map(line =>  line ? `    ${line}` : '')
                .join('\n');

            return `module ${options.baseNamespace} {\n${indentedResult}\n}`;
        }

        return result;
    }
};

function generateEnum(cSharpEnum: CSharpEnum, options: IOptions): string {
    'use strict';

    let modifier = options && options.baseNamespace ? 'export' : 'declare';

    let nextIndex = 0;
    let entryStrings: string[] = [];
    for (let entry of cSharpEnum.entries) {
        entryStrings.push(`${entry.name} = ${entry.value || nextIndex}`);

        nextIndex = isNaN(entry.value) ? nextIndex + 1 : entry.value + 1;
    }

    return `${modifier} enum ${cSharpEnum.name} {\n    ${entryStrings.join(',\n    ')}\n}`;
}

function generateInterface(type: CSharpClassOrStruct, options: IOptions): string {
    'use strict';

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

function generatePrimaryFilter(type: CSharpClassOrStruct, options: IOptions): string {
    'use strict';

    let modifier = options && options.baseNamespace ? 'export ' : '';

    let filterGroup = pluralize(type.namespace.match(/\.([\w_]+)$/)[1]);
    let domainType = type.inherits.match(primaryFilterRegex)[1];
    let filterType = options && options.dtoNamespace ? `${options.dtoNamespace}.${domainType}` : domainType;

    let tsConstructorParameters: string[] = [];
    let filterParameters: string[] = [];
    if (type.constructors.length === 1) {
        for (let parameter of type.constructors[0].parameters) {
            let tsParameterType = Utility.translateType(parameter.type.name, options);

            let shouldEncode = tsParameterType === 'string' || tsParameterType === 'any' || tsParameterType === 'Date';
            let shouldToString = tsParameterType !== 'string';
            let toString = tsParameterType === 'Date' ? 'toISOString' : 'toString';

            if (parameter.type.isCollection) {
                tsParameterType += '[]';
            }
            tsConstructorParameters.push(`private ${parameter.name}: ${tsParameterType}`);

            let filterParameter: string;
            if (parameter.type.isCollection) {
                let mapToExpression = 'i';
                if (shouldToString) {
                    mapToExpression = `i.${toString}()`;
                }
                if (shouldEncode) {
                    mapToExpression = `encodeURIComponent(${mapToExpression})`;
                }
                let mapCall = mapToExpression !== 'i' ? `.map(i => ${mapToExpression})` : '';

                filterParameter = `this.${parameter.name}${mapCall}.join(',')`;
            } else {
                filterParameter = `this.${parameter.name}`;
                if (shouldToString) {
                    filterParameter = `${filterParameter}.${toString}()`;
                }
                if (shouldEncode) {
                    filterParameter = `encodeURIComponent(${filterParameter})`;
                }
            }
            filterParameters.push(filterParameter);
        }
    }

    let result = '';
    result += `${modifier}class ${filterGroup}${type.name}Filter implements IPrimaryFilter<${filterType}> {\n`;
    result += `    constructor(${tsConstructorParameters.join(', ')}) {\n`;
    result += `    }\n\n`;

    result += `    public getFilterName(): string {\n`;
    result += `        return '${type.name}';\n`;
    result += `    }\n\n`;

    result += `    public getParameters(): string[] {\n`;
    result += `        return [${filterParameters.join(', ')}];\n`;
    result += `    }\n`;
    result += `}`;
    return result;
}
