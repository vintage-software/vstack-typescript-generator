interface IOptions {
    baseNamespace?: string;
    prefixWithI?: boolean;
    dateTimeToDate?: boolean;
    ignoreInheritance?: string[];
    propertyNameResolver?: (prop: string) => string;
    dtoNamespace?: string;
}
