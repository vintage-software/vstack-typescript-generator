export interface Options {
  dateTimeToDate?: boolean;
  allPropertiesOptional?: boolean;
  tsTypeMap?: { [index: string]: string }
}

export const defaultOptions: Options = {
  dateTimeToDate: false,
  allPropertiesOptional: false,
  tsTypeMap: {}
}
