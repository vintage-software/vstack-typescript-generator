interface IClassInterfaceOptions {
    definitionFile?: boolean;
    baseNamespace?: string;
    prefixWithI?: boolean;
    dateTimeToDate?: boolean;
    ignoreInheritance?: string[];
    propertyNameResolver?: (prop: string) => string;
}
