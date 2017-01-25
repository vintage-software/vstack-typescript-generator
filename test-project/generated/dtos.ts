import {
  TimeSpan,
  Benefits
} from './../shared/interfaces';

import {
  StatusEnum,
  PositionEnum
} from './../shared/enums';

export interface Employee {
  firstName: string;
  lastName: string;
  position: PositionEnum;
  status: StatusEnum;
  workSchedule: TimeSpan;
  benefits: Benefits;
}

export interface Person {
  firstName: string;
  lastName: string;
}