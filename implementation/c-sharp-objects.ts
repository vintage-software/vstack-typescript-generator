class CSharpType {
    constructor(public name: string, public inherits: string) {
    }
}

class CSharpClassOrStruct extends CSharpType {
    constructor(public name: string, public inherits: string, public properties: CSharpProperty[]) {
        super(name, inherits);
    }
}

class CSharpEnum extends CSharpType {
    constructor(public name: string, public inherits: string, public entries: CSharpEnumEntry[]) {
        super(name, inherits);
    }
}

class CSharpMemberType {
    constructor(public name: string, public isNullable: boolean, public isCollection: boolean) {
    }
}

class CSharpProperty {
    constructor(public type: CSharpMemberType, public name: string) {
    }
}

class CSharpEnumEntry {
    constructor(public name: string, public value: number) {
    }
}
