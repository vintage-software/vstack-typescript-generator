export declare class CSharpType {
    namespace: string;
    name: string;
    inherits: string[];
    constructor(namespace: string, name: string, inherits: string[]);
}
export declare class CSharpClassOrStruct extends CSharpType {
    namespace: string;
    name: string;
    inherits: string[];
    constructors: CSharpContructor[];
    properties: CSharpProperty[];
    constructor(namespace: string, name: string, inherits: string[], constructors: CSharpContructor[], properties: CSharpProperty[]);
}
export declare class CSharpMemberType {
    name: string;
    isNullable: boolean;
    isCollection: boolean;
    constructor(name: string, isNullable: boolean, isCollection: boolean);
}
export declare class CSharpContructor {
    parameters: CSharpParameter[];
    constructor(parameters: CSharpParameter[]);
}
export declare class CSharpMember {
    type: CSharpMemberType;
    name: string;
    constructor(type: CSharpMemberType, name: string);
}
export declare class CSharpProperty extends CSharpMember {
    type: CSharpMemberType;
    name: string;
    constructor(type: CSharpMemberType, name: string);
}
export declare class CSharpParameter extends CSharpMember {
    type: CSharpMemberType;
    name: string;
    constructor(type: CSharpMemberType, name: string);
}
export declare class CSharpEnum extends CSharpType {
    namespace: string;
    name: string;
    inherits: string[];
    entries: CSharpEnumEntry[];
    constructor(namespace: string, name: string, inherits: string[], entries: CSharpEnumEntry[]);
}
export declare class CSharpEnumEntry {
    name: string;
    value: number;
    constructor(name: string, value: number);
}
