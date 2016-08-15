import { CSharpType } from './c-sharp-objects';
export declare class CSharpParser {
    static parse(input: string): CSharpType[];
    private static stripIgnored(input);
    private static stripComments(input);
    private static parseClassOrStruct(namespace, name, inherits, body);
    private static parseEnum(namespace, name, inherits, body);
    private static parseMemberTypeName(typeName);
}
