/* tslint:disable */

import {
  TimeSpan,
  Benefits
} from './../shared/interfaces';

import {
  StatusEnum,
  PositionEnum
} from './../shared/enums';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: PositionEnum;
  status: StatusEnum;
  workSchedule: TimeSpan;
  benefits: Benefits;
  manager: Employee;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  parents: Person[];
}

export function getSchema(schema: any) {
  const schemas = {
    employee: new schema.Entity('employee'),
    person: new schema.Entity('person')
  }

  schemas['employee'].define({
    managers: schemas['employee']
  });

  schemas['person'].define({
    parents: [ schemas['person'] ]
  });

  return schemas;
}
