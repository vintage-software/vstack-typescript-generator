interface IEnumOptions {
    definitionFile?: boolean;
    baseNamespace?: string;
}

interface IClassInterfaceOptions {
    definitionFile?: boolean;
    baseNamespace?: string;
    prefixWithI?: boolean;
    dateTimeToDate?: boolean;
    ignoreInheritance?: string[];
    propertyNameResolver?: (prop: string) => string;
}
