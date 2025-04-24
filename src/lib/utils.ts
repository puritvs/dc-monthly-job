import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Job } from "./types/job";
import { JobType } from "./types/jobType";
import { format } from "date-fns";
import { PeriodType } from "./types/periodType";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sortJobByStartDate = (a: Job, b: Job) => {
  if (a.startDate === b.startDate) return 0;
  else if (a.startDate < b.startDate) return -1;
  else return 1;
};

function rowToText(job: Job, index: number) {
  return `${index + 1} ${format(job.startDate, "dd/MM/yyyy")} ${
    job.periodType === PeriodType.PERIOD
      ? `- ${format(job.endDate, "dd/MM/yyyy")}`
      : ""
  } ${job.name} ${job.remark ? `(${job.remark})` : ""}\n${job.description}\n`;
}

export function jobToText(jobs: Job[]) {
  var result = "";
  result = `CHOREOGRAPHER\n`;
  jobs
    .sort((a: Job, b: Job) => sortJobByStartDate(a, b))
    .filter((job) => job.type === JobType.CHOREOGRAPHER)
    .map((job, index) => {
      result += rowToText(job, index);
    });

  result += `\n--------------------------------------\n`;
  result += `DANCER\n`;
  jobs
    .sort((a: Job, b: Job) => sortJobByStartDate(a, b))
    .filter((job) => job.type === JobType.DANCER)
    .map((job, index) => {
      result += rowToText(job, index);
    });

  return result;
}
