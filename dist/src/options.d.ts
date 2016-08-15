export interface Options {
    baseNamespace?: string;
    prefixWithI?: boolean;
    dateTimeToDate?: boolean;
    ignoreInheritance?: string[];
    propertyNameResolver?: (prop: string) => string;
    dtoNamespace?: string;
}
