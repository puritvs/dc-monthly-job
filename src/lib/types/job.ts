import { JobType } from "./jobType";
import { PeriodType } from "./periodType";

export type Job = {
  _id: string;
  type: JobType;
  name: string;
  periodType: PeriodType;
  startDate: Date;
  endDate: Date;
  description: string;
  remark: string;
};
