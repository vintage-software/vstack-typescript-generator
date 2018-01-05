/* tslint:disable */

import {
  StatusEnum,
  PositionEnum,
  TimeSpan,
  Benefits
} from './../shared/imports';

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
