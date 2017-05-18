/* tslint:disable */

export function getSchema(schema: any) {
  const schemas = {
    employees: new schema.Entity('employees'),
    people: new schema.Entity('people')
  }

  schemas['employees'].define({
    manager: schemas['employees']
  });

  schemas['people'].define({
    parents: [ schemas['people'] ]
  });

  return schemas;
}
