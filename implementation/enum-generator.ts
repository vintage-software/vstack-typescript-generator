/// <reference path="utility.ts" />
/// <reference path="c-sharp-parser.ts" />

class EnumGenerator {
    public static generate(input: string, options?: IEnumOptions): string {
        let result = CSharpParser.parse(input)
            .filter(type => type instanceof CSharpEnum)
            .map(type => EnumGenerator.generateEnum(<CSharpEnum>type, options))
            .join('\n\n');

        return Utility.wrapResult(result, options);
    }

    private static generateEnum(cSharpEnum: CSharpEnum, options: IEnumOptions): string {
        let modifier = options && options.baseNamespace ? 'export' : 'declare';

        let nextIndex = 0;
        let entryStrings: string[] = [];
        for (let entry of cSharpEnum.entries) {
            entryStrings.push(`${entry.name} = ${entry.value || nextIndex}`);

            nextIndex = isNaN(entry.value) ? nextIndex + 1 : entry.value + 1;
        }

        return `${modifier} enum ${cSharpEnum.name} {\n    ${entryStrings.join(',\n    ')}\n}`;
    }
}
