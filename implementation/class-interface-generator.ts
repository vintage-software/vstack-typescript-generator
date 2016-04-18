/// <reference path="options.ts" />
/// <reference path="utility.ts" />

class ClassInterfaceGenerator {
    public static generate(input: string, options?: IClassInterfaceOptions): string {
        input = Utility.stripComments(input);

        let result = '';
        let match: RegExpExecArray;

        let typeRegex = /^([\t ]*)(?:public\s*|partial\s*|abstract\s*)*\s*(?:class|struct)\s+([\w\d_<>]+)(?:\s*:\s*((?:(?:[\w\d\._]+)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)*?)^\1\}/gm;
        while (!!(match = typeRegex.exec(input))) {
            let typeName = match[2];
            let inherits = match[3];
            let body = match[4];

            if (result.length > 0) {
                result += '\n\n';
            }

            if (inherits && (!options || !options.ignoreInheritance || options.ignoreInheritance.indexOf(inherits) === -1)) {
                typeName += ` extends ${inherits}`;
            }

            if (options && options.prefixWithI) {
                typeName = `I${typeName}`;
            }

            result += ClassInterfaceGenerator.generateInterface(typeName, body, options);
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

    private static generateInterface(className: string, classBody: string, options: IClassInterfaceOptions): string {
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
}
