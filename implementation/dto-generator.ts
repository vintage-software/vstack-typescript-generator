/// <reference path="types/dto-options.d.ts" />
/// <reference path="utility.ts" />

class DtoGenerator {
    public static generateDto(input: string, options?: IDtoOptions): string {
        input = Utility.stripComments(input);

        let result = '';
        let match: RegExpExecArray;

        let typeRegex = /^([\t ]*)(?:public\s*|partial\s*|abstract\s*)*\s*(class|enum|struct)\s+([\w\d_<>]+)(?:\s*:\s*((?:(?:[\w\d\._]+)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)*?)^\1\}/gm;
        while (!!(match = typeRegex.exec(input))) {
            let type = match[2];
            let typeName = match[3];
            let inherits = match[4];
            let body = match[5];

            if (result.length > 0) {
                result += '\n\n';
            }

            if (type === 'class' || type === 'struct') {
                if (inherits && (!options || !options.ignoreInheritance || options.ignoreInheritance.indexOf(inherits) === -1)) {
                    typeName += ` extends ${inherits}`;
                }

                if (options && options.prefixWithI) {
                    typeName = `I${typeName}`;
                }

                result += DtoGenerator.generateInterface(typeName, body, options);
            } else if (type === 'enum') {
                if (!options || !options.baseNamespace) {
                    result += 'declare ';
                }

                result += DtoGenerator.generateEnum(typeName, body, options);
            }
        }

        if (options && options.baseNamespace) {
            let firstLine = options.definitionFile === false ?
                `module ${options.baseNamespace} {` :
                `declare module ${options.baseNamespace} {`;

            result = []
                .concat(firstLine)
                .concat(result.split('\n').map(line => {
                    line = /^(interface|enum)/.test(line) ? `export ${line}` : line;
                    return line ? `    ${line}` : '';
                }))
                .concat('}')
                .join('\n');
        }

        return result;
    }

    private static generateInterface(className: string, classBody: string, options: IDtoOptions): string {
        let propertyRegex = /public ([^?\s]*)(\??) ([\w\d]+)\s*{\s*get;\s*set;\s*}/gm;
        let collectionRegex = /(?:List|IEnumerable)<([\w\d]+)>/;
        let arrayRegex = /([\w\d]+)\[\]/;

        let definition = `interface ${className} {\n`;

        let propertyResult: RegExpExecArray;
        while (!!(propertyResult = propertyRegex.exec(classBody))) {
            let varType: string = Utility.translateType(propertyResult[1], options);

            let isOptional = propertyResult[2] === '?';

            if (!varType) {
                varType = propertyResult[1];

                let collectionMatch = collectionRegex.exec(varType);
                let arrayMatch = arrayRegex.exec(varType);

                if (collectionMatch) {
                    let collectionType = collectionMatch[1];

                    if (Utility.translateType(collectionType, options)) {
                        varType = Utility.translateType(collectionType, options);
                    } else {
                        varType = collectionType;

                        if (options && options.prefixWithI) {
                            varType = `I${varType}`;
                        }
                    }

                    varType += '[]';
                } else if (arrayMatch) {
                    let arrayType = arrayMatch[1];

                    if (Utility.translateType(arrayType, options)) {
                        varType = Utility.translateType(arrayType, options);
                    } else {
                        varType = arrayType;

                        if (options && options.prefixWithI) {
                            varType = `I${varType}`;
                        }
                    }

                    varType += '[]';
                } else if (options && options.prefixWithI) {
                    varType = `I${varType}`;
                }
            }

            let propertyName = propertyResult[3];
            if (options && options.propertyNameResolver) {
                propertyName = options.propertyNameResolver(propertyName);
            }
            definition += `    ${propertyName}`;

            if (isOptional) {
                definition += '?';
            }

            definition += `: ${varType};\n`;
        }

        definition += '}';

        return definition;
    }

    private static generateEnum(enumName: string, enumBody: string, options: IDtoOptions): string {
        let entryRegex = /([^\s,]+)\s*=?\s*(\d+)?,?/gm;
        let definition = `enum ${enumName} {\n    `;

        let elements: string[] = [];
        let lastIndex = 0;

        let entryResult: RegExpExecArray;
        while (!!(entryResult = entryRegex.exec(enumBody))) {
            let entryName = entryResult[1];
            let entryValue = parseInt(entryResult[2], 10);

            if (entryName.indexOf('[') !== -1) {
                continue;
            }

            if (!entryValue) {
                entryValue = lastIndex;

                lastIndex++;
            } else {
                lastIndex = entryValue + 1;
            }

            elements.push(`${entryName} = ${entryValue}`);
        }

        definition += elements.join(',\n    ');

        definition += '\n}';

        return definition;
    }
}
