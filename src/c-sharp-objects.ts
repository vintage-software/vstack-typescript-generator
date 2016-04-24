class CSharpType {
    constructor(public namespace: string, public name: string, public inherits: string) {
    }
}

class CSharpClassOrStruct extends CSharpType {
    constructor(public namespace: string, public name: string, public inherits: string, public constructors: CSharpContructor[], public properties: CSharpProperty[]) {
        super(namespace, name, inherits);
    }
}

class CSharpMemberType {
    constructor(public name: string, public isNullable: boolean, public isCollection: boolean) {
    }
}

class CSharpContructor {
    constructor(public parameters: CSharpParameter[]) {
    }
}

class CSharpMember {
    constructor(public type: CSharpMemberType, public name: string) {
    }
}

class CSharpProperty extends CSharpMember {
    constructor(public type: CSharpMemberType, public name: string) {
        super(type, name);
    }
}

class CSharpParameter extends CSharpMember {
    constructor(public type: CSharpMemberType, public name: string) {
        super(type, name);
    }
}

class CSharpEnum extends CSharpType {
    constructor(public namespace: string, public name: string, public inherits: string, public entries: CSharpEnumEntry[]) {
        super(namespace, name, inherits);
    }
}

class CSharpEnumEntry {
    constructor(public name: string, public value: number) {
    }
}
