/// <reference path="c-sharp-objects.ts" />

class CSharpParser {
    public static parse(input: string): CSharpType[] {
        input = CSharpParser.stripComments(input);

        let types: CSharpType[] = [];

        let typeMatch: RegExpExecArray;
        let typeRegex = /^([\t ]*)(?:public\s*|partial\s*|abstract\s*)*\s*(enum|class|struct)\s+([\w\d_<>]+)(?:\s*:\s*((?:(?:[\w\d\._]+)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)*?)^\1\}/gm;
        let getNextTypeMatch = () => typeMatch = typeRegex.exec(input);
        while (getNextTypeMatch() !== null) {
            let type = typeMatch[2];
            let name = typeMatch[3];
            let inherits = typeMatch[4];
            let body = typeMatch[5];

            if (type === 'class' || type === 'struct') {
                types.push(CSharpParser.parseClassOrStruct(name, inherits, body));
            } else if (type === 'enum') {
                types.push(CSharpParser.parseEnum(name, inherits, body));
            }
        }

        return types;
    }

    private static stripComments(input: string): string {
        let blockCommentRegex = new RegExp('/\\*([\\s\\S]*)\\*/', 'gm');
        let lineCommentRegex = new RegExp('//(.*)', 'g');

        return input
            .replace(blockCommentRegex, '')
            .split('\n')
            .map(line => line.replace(lineCommentRegex, ''))
            .join('\n');
    }

    private static parseClassOrStruct(name: string, inherits: string, body: string) {
        let properties: CSharpProperty[] = [];

        let propertyMatch: RegExpExecArray;
        let propertyRegex = /public\s*([^\s]+)\s*([\w\d]+)\s*{\s*get;\s*set;\s*}/gm;
        let getNextPropertyMatch = () => propertyMatch = propertyRegex.exec(body);
        while (getNextPropertyMatch() !== null) {
            let typeName = propertyMatch[1];
            let propertyName = propertyMatch[2];

            let memberType = CSharpParser.parseMemberTypeName(typeName);

            properties.push(new CSharpProperty(memberType, propertyName));
        }

        return new CSharpClassOrStruct(name, inherits, properties);
    }

    private static parseEnum(name: string, inherits: string, body: string) {
        let entries: CSharpEnumEntry[] = [];

        let entryMatch: RegExpExecArray;
        let entryRegex = /([^\s,]+)\s*=?\s*(\d+)?,?/gm;
        let getNextEntryMatch = () => entryMatch = entryRegex.exec(body);
        while (getNextEntryMatch() !== null) {
            let entryName = entryMatch[1];
            let entryValue = parseInt(entryMatch[2], 10);

            if (entryName.indexOf('[') === -1) {
                entries.push(new CSharpEnumEntry(entryName, entryValue));
            }
        }

        return new CSharpEnum(name, inherits, entries);
    }

    private static parseMemberTypeName(typeName: string): CSharpMemberType {
        let nullableRegex = /(?:^Nullable<([^\s]+)>$)|(?:^([^\s]+)\?$)/;
        let nullableMatch = nullableRegex.exec(typeName);
        if (nullableMatch) {
            typeName = nullableMatch[1] || nullableMatch[2];
        }

        let collectionRegex = /(?:^(?:List|IEnumerable)<([\w\d]+)>$)|(?:^([\w\d]+)\[\]$)/;
        let collectionMatch = collectionRegex.exec(typeName);
        if (collectionMatch) {
            typeName = collectionMatch[1] || collectionMatch[2];
        }

        return new CSharpMemberType(typeName, !!nullableMatch, !!collectionMatch);
    }
}
