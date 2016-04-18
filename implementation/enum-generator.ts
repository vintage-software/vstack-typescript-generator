/// <reference path="options.ts" />
/// <reference path="utility.ts" />

class EnumGenerator {
    public static generate(input: string, options?: IClassInterfaceOptions): string {
        input = Utility.stripComments(input);

        let result = '';
        let match: RegExpExecArray;

        let typeRegex = /^^([\t ]*)public*\s*enum\s+([\w\d_]+)(?:\s*:\s*(?:(?:(?:[\w\d\._]+)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)*?)^\1\}/gm;
        while (!!(match = typeRegex.exec(input))) {
            let typeName = match[2];
            let body = match[3];

            if (result.length > 0) {
                result += '\n\n';
            }

            if (!options || !options.baseNamespace) {
                result += 'declare ';
            }

            result += EnumGenerator.generateEnum(typeName, body, options);
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

    private static generateEnum(enumName: string, enumBody: string, options: IClassInterfaceOptions): string {
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
