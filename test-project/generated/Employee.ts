/* tslint:disable */

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
