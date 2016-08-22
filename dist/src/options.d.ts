export interface Options {
    moduleName?: string;
    prefixWithI?: boolean;
    dateTimeToDate?: boolean;
    ignoreInheritance?: string[];
    propertyNameResolver?: (prop: string) => string;
    dtoModuleName?: string;
}
