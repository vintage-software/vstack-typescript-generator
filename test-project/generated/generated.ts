/* tslint:disable */

import {
  StatusEnum,
  PositionEnum
} from './../shared/enums';

import {
  TimeSpan,
  Benefits
} from './../shared/interfaces';

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

export interface IHuman {
  name: string;
  height: number;
  weight?: number;
  appendages: string[];
}

export interface IMammal {
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
