/* tslint:disable */

export function getSchema(schema: any) {
  const schemas = {
    employees: new schema.Entity('employee'),
    people: new schema.Entity('person')
  }

  schemas['employee'].define({
    manager: schemas['employee']
  });

  schemas['person'].define({
    parents: [ schemas['person'] ]
  });

  return schemas;
}
