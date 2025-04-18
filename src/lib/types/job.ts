import { JobType } from "./jobType";
import { PeriodType } from "./periodType";

export type Job = {
  type: JobType;
  name: string;
  periodType: PeriodType;
  startDate: Date;
  endDate: Date;
};
