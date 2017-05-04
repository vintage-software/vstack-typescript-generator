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
