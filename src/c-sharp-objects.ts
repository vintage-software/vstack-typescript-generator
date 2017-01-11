export class CSharpType {
  constructor(public namespace: string, public name: string, public inherits: string[]) {
  }
}

export class CSharpClassOrStruct extends CSharpType {
  constructor(public namespace: string, public name: string, public inherits: string[], public constructors: CSharpContructor[], public properties: CSharpProperty[]) {
    super(namespace, name, inherits);
  }
}

export class CSharpMemberType {
  constructor(public name: string, public isNullable: boolean, public isCollection: boolean) {
  }
}

export class CSharpContructor {
  constructor(public parameters: CSharpParameter[]) {
  }
}

export class CSharpMember {
  constructor(public type: CSharpMemberType, public name: string) {
  }
}

export class CSharpProperty extends CSharpMember {
  constructor(public type: CSharpMemberType, public name: string) {
    super(type, name);
  }
}

export class CSharpParameter extends CSharpMember {
  constructor(public type: CSharpMemberType, public name: string, public defaultValue: string) {
    super(type, name);
  }
}

export class CSharpEnum extends CSharpType {
  constructor(public namespace: string, public name: string, public inherits: string[], public entries: CSharpEnumEntry[]) {
    super(namespace, name, inherits);
  }
}

export class CSharpEnumEntry {
  constructor(public name: string, public value: number) {
  }
}
