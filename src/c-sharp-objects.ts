export class CSharpType {
  constructor(
    readonly namespace: string,
    readonly name: string,
    readonly inherits: string[]
  ) { }
}

export class CSharpClassOrStructOrInterface extends CSharpType {
  constructor(
    readonly namespace: string,
    readonly name: string,
    readonly inherits: string[],
    readonly constructors: CSharpContructor[],
    readonly properties: CSharpProperty[]
  ) {
    super(namespace, name, inherits);
  }
}

export class CSharpMemberType {
  constructor(
    readonly name: string,
    readonly isNullable: boolean,
    readonly isCollection: boolean
  ) { }
}

export class CSharpContructor {
  constructor(
    readonly parameters: CSharpParameter[]
  ) { }
}

export class CSharpMember {
  constructor(
    readonly type: CSharpMemberType,
    readonly name: string
  ) { }
}

export class CSharpProperty extends CSharpMember {
  constructor(
    readonly type: CSharpMemberType,
    readonly name: string
  ) {
    super(type, name);
  }
}

export class CSharpParameter extends CSharpMember {
  constructor(
    readonly type: CSharpMemberType,
    readonly name: string,
    readonly defaultValue: string
  ) {
    super(type, name);
  }
}

export class CSharpEnum extends CSharpType {
  constructor(
    readonly namespace: string,
    readonly name: string,
    readonly inherits: string[],
    readonly entries: CSharpEnumEntry[]
  ) {
    super(namespace, name, inherits);
  }
}

export class CSharpEnumEntry {
  constructor(
    readonly name: string,
    readonly value: string
  ) { }
}
