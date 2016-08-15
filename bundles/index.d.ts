declare module "options" {
    export interface Options {
        baseNamespace?: string;
        prefixWithI?: boolean;
        dateTimeToDate?: boolean;
        ignoreInheritance?: string[];
        propertyNameResolver?: (prop: string) => string;
        dtoNamespace?: string;
    }
}
declare module "utility" {
    import { Options } from "options";
    export class Utility {
        static translateType(csType: string, options: Options): string;
    }
}
declare module "c-sharp-objects" {
    export class CSharpType {
        namespace: string;
        name: string;
        inherits: string;
        constructor(namespace: string, name: string, inherits: string);
    }
    export class CSharpClassOrStruct extends CSharpType {
        namespace: string;
        name: string;
        inherits: string;
        constructors: CSharpContructor[];
        properties: CSharpProperty[];
        constructor(namespace: string, name: string, inherits: string, constructors: CSharpContructor[], properties: CSharpProperty[]);
    }
    export class CSharpMemberType {
        name: string;
        isNullable: boolean;
        isCollection: boolean;
        constructor(name: string, isNullable: boolean, isCollection: boolean);
    }
    export class CSharpContructor {
        parameters: CSharpParameter[];
        constructor(parameters: CSharpParameter[]);
    }
    export class CSharpMember {
        type: CSharpMemberType;
        name: string;
        constructor(type: CSharpMemberType, name: string);
    }
    export class CSharpProperty extends CSharpMember {
        type: CSharpMemberType;
        name: string;
        constructor(type: CSharpMemberType, name: string);
    }
    export class CSharpParameter extends CSharpMember {
        type: CSharpMemberType;
        name: string;
        constructor(type: CSharpMemberType, name: string);
    }
    export class CSharpEnum extends CSharpType {
        namespace: string;
        name: string;
        inherits: string;
        entries: CSharpEnumEntry[];
        constructor(namespace: string, name: string, inherits: string, entries: CSharpEnumEntry[]);
    }
    export class CSharpEnumEntry {
        name: string;
        value: number;
        constructor(name: string, value: number);
    }
}
declare module "c-sharp-parser" {
    import { CSharpType } from "c-sharp-objects";
    export class CSharpParser {
        static parse(input: string): CSharpType[];
        private static stripIgnored(input);
        private static stripComments(input);
        private static parseClassOrStruct(namespace, name, inherits, body);
        private static parseEnum(namespace, name, inherits, body);
        private static parseMemberTypeName(typeName);
    }
}
declare module "index" {
    import { Options } from "options";
    export default function tsGenerator(input: string, options?: Options): string;
}
