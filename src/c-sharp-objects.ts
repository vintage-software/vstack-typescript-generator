export class CSharpType {
  constructor(
    public readonly namespace: string,
    public readonly name: string,
    public readonly inherits: string[]
  ) { }
}

export class CSharpClassOrStructOrInterface extends CSharpType {
  constructor(
    public readonly namespace: string,
    public readonly name: string,
    public readonly inherits: string[],
    public readonly constructors: CSharpContructor[],
    public readonly properties: CSharpProperty[]
  ) {
    super(namespace, name, inherits);
  }
}

export class CSharpMemberType {
  constructor(
    public readonly name: string,
    public readonly isNullable: boolean,
    public readonly isCollection: boolean
  ) { }
}

export class CSharpContructor {
  constructor(
    public readonly parameters: CSharpParameter[]
  ) { }
}

export class CSharpMember {
  constructor(
    public readonly type: CSharpMemberType,
    public readonly name: string
  ) { }
}

export class CSharpProperty extends CSharpMember {
  constructor(
    public readonly type: CSharpMemberType,
    public readonly name: string
  ) {
    super(type, name);
  }
}

export class CSharpParameter extends CSharpMember {
  constructor(
    public type: CSharpMemberType,
    public name: string,
    public defaultValue: string
  ) {
    super(type, name);
  }
}

export class CSharpEnum extends CSharpType {
  constructor(
    public namespace: string,
    public name: string,
    public inherits: string[],
    public entries: CSharpEnumEntry[]
  ) {
    super(namespace, name, inherits);
  }
}

export class CSharpEnumEntry {
  constructor(
    public name: string,
    public value: number
  ) { }
}
