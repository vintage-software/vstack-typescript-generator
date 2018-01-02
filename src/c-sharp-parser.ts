import { CSharpClassOrStructOrInterface, CSharpContructor, CSharpEnum, CSharpEnumEntry, CSharpMemberType, CSharpParameter, CSharpProperty, CSharpType } from './c-sharp-objects';

export class CSharpParser {
  public static parse(input: string): CSharpType[] {
    input = CSharpParser.stripIgnored(input);
    input = CSharpParser.stripComments(input);

    const namespaceMatch = input.match(/namespace\s+([\w\.]+)/);
    const namespace = namespaceMatch ? namespaceMatch[1] : '';

    const types: CSharpType[] = [];

    let typeMatch: RegExpExecArray;
    // tslint:disable-next-line:max-line-length
    const typeRegex = /^([\t ]*)(?:public\s*|partial\s*|abstract\s*)*\s*(enum|class|struct|interface)\s+([\w\d_<>]+)(?:\s*:\s*((?:(?:[\w\d\.\<\>_]+)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)*?)^\1\}/gm;
    const getNextTypeMatch = () => typeMatch = typeRegex.exec(input);
    while (getNextTypeMatch() !== null) {
      const type = typeMatch[2];
      const name = typeMatch[3];
      const inherits = CSharpParser.parseInherits(typeMatch[4]);
      const body = typeMatch[5];

      if (type === 'class' || type === 'struct') {
        types.push(CSharpParser.parseClassOrStruct(namespace, name, inherits, body));
      } else if (type === 'interface') {
        types.push(CSharpParser.parseInterface(namespace, name, inherits, body));
      } else if (type === 'enum') {
        types.push(CSharpParser.parseEnum(namespace, name, inherits, body));
      }
    }

    return types;
  }

  private static stripIgnored(input: string): string {
    const ignoredRegex = /\/\/\s*ts-generator-ignore\s*.*(enum|class|struct|interface)\s+/gm;

    return input.replace(ignoredRegex, '');
  }

  private static stripComments(input: string): string {
    const blockCommentRegex = /\/\*([\s\S]*?)\*\//gm;
    const lineCommentRegex = /\/\/(.*)/g;

    return input
      .replace(blockCommentRegex, '')
      .split('\n')
      .map(line => line.replace(lineCommentRegex, ''))
      .join('\n');
  }

  private static parseInherits(inheritsStr: string) {
    const inherits: string[] = [];

    if (inheritsStr) {
      let inheritsMatch: RegExpExecArray;
      const inheritsRegex = /(?:[\w\d\.\_]+)(?:\<.+?\>)?/g;
      const getNextInheritsMatch = () => inheritsMatch = inheritsRegex.exec(inheritsStr);
      while (getNextInheritsMatch() !== null) {
        inherits.push(inheritsMatch[0]);
      }
    }

    return inherits;
  }

  private static parseClassOrStruct(namespace: string, name: string, inherits: string[], body: string) {
    const constructors: CSharpContructor[] = [];
    let constructorMatch: RegExpExecArray;
    const constructorRegex = /public\s+([\w]+)\s*\(((?:.|\r|\n)*?)\)/gm;
    const getNextConstructorMatch = () => constructorMatch = constructorRegex.exec(body);
    while (getNextConstructorMatch() !== null) {
      const typeName = constructorMatch[1];
      const parameterList = constructorMatch[2];

      if (typeName === name) {
        const parameters = parameterList.length ? parameterList
          .split(',')
          .map(parameter => {
            const parameterMatch = parameter.trim().match(/([^\s]+)\s+([\w\d]+)(?:\s+=\s+((?:[\w\d]+)|(?:"[\w\d ]+")))?/);
            const parameterType = CSharpParser.parseMemberTypeName(parameterMatch[1]);
            const parameterName = parameterMatch[2];
            const rawDefaultParameter = parameterMatch[3];

            const defaultValue = rawDefaultParameter && rawDefaultParameter.startsWith('"') && rawDefaultParameter.endsWith('"') ?
              `'${rawDefaultParameter.substr(1, rawDefaultParameter.length - 2)}'` : rawDefaultParameter;

            return new CSharpParameter(parameterType, parameterName, defaultValue);
          }) : [];

        constructors.push(new CSharpContructor(parameters));
      }
    }

    const properties: CSharpProperty[] = CSharpParser.getProperties(body, false);

    return new CSharpClassOrStructOrInterface(namespace, name, inherits, constructors, properties);
  }

  private static parseInterface(namespace: string, name: string, inherits: string[], body: string) {
    const properties: CSharpProperty[] = CSharpParser.getProperties(body, true);
    return new CSharpClassOrStructOrInterface(namespace, name, inherits, null, properties);
  }

  private static parseEnum(namespace: string, name: string, inherits: string[], body: string) {
    const entries: CSharpEnumEntry[] = [];

    let entryMatch: RegExpExecArray;
    const entryRegex = /^\s*([\w\d_]+)\s*=?\s*((?:0x|-|~)?[0-9A-Za-z_]+)?,?\s*$/gm;
    const getNextEntryMatch = () => entryMatch = entryRegex.exec(body);
    while (getNextEntryMatch() !== null) {
      const entryName = entryMatch[1];
      const entryValue = entryMatch[2];

      if (entryName.indexOf('[') === -1) {
        entries.push(new CSharpEnumEntry(entryName, entryValue));
      }
    }

    return new CSharpEnum(namespace, name, inherits, entries);
  }

  private static parseMemberTypeName(typeName: string): CSharpMemberType {
    const lastNameRegex = /\.?([\w<>\[\]\?]+)$/;

    const nullableRegex = /(?:^Nullable<([^\s]+)>$)|(?:^([^\s]+)\?$)/;
    const nullableMatch = nullableRegex.exec(typeName);
    if (nullableMatch) {
      typeName = (nullableMatch[1] || nullableMatch[2]);
    }

    const collectionRegex = /(?:List|IEnumerable)<([\w\d\.]+)>$|(?:^([\w\d\.]+)\[\]$)/;
    const collectionMatch = collectionRegex.exec(typeName);
    if (collectionMatch) {
      typeName = (collectionMatch[1] || collectionMatch[2]);
    }

    typeName = typeName.match(lastNameRegex)[1];

    return new CSharpMemberType(typeName, !!nullableMatch, !!collectionMatch);
  }

  private static getProperties(body: string, isInterface: boolean): CSharpProperty[] {
    const properties: CSharpProperty[] = [];
    let propertyMatch: RegExpExecArray;
    const propertyRegex = isInterface ? /\s*([^\s]+)\s*([\w\d]+)\s*{\s*get/gm : /public\s*([^\s]+)\s*([\w\d]+)\s*{\s*get/gm;

    const getNextPropertyMatch = () => propertyMatch = propertyRegex.exec(body);
    while (getNextPropertyMatch() !== null) {
      const typeName = propertyMatch[1];
      const propertyName = propertyMatch[2];

      const memberType = CSharpParser.parseMemberTypeName(typeName);

      properties.push(new CSharpProperty(memberType, propertyName));
    }

    return properties;
  }
}
