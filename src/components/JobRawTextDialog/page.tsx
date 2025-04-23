import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobsContext } from "@/contexts/jobsContext";
import { JobType } from "@/lib/types/jobType";
import { PeriodType } from "@/lib/types/periodType";
import { Separator } from "@radix-ui/react-select";
import { format } from "date-fns";
import { useContext } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function JobRawTextDialog() {
  const { jobs } = useContext(JobsContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Raw Text</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Raw</DialogTitle>
          <DialogDescription>Formatted job summary</DialogDescription>
        </DialogHeader>

        <Label>{JobType.CHOREOGRAPHER}</Label>
        <ScrollArea className=" h-full  w-fit ">
          {jobs
            .filter((job) => job.type === JobType.CHOREOGRAPHER)
            .map((job, index) => (
              <div key={`${index}`}>
                <span className=" mr-5 ">{index + 1}</span>

                <span>
                  {format(job.startDate, "dd/MM/yyyy")}{" "}
                  {job.periodType === PeriodType.PERIOD &&
                    `- ${format(job.endDate, "dd/MM/yyyy")}`}{" "}
                </span>
                <span>{job.name}</span>
                <span> {` (${job.remark})`}</span>
                <br />
                <pre className=" ml-5 ">{job.description}</pre>
              </div>
            ))}
          <Separator className="my-5" />
          <Label>{JobType.DANCER}</Label>

          {jobs
            .filter((job) => job.type === JobType.DANCER)
            .map((job, index) => (
              <div key={`${index}`}>
                <span className=" mr-5 ">{index + 1}</span>
                <span>
                  {format(job.startDate, "dd/MM/yyyy")}{" "}
                  {job.periodType === PeriodType.PERIOD &&
                    `- ${format(job.endDate, "dd/MM/yyyy")}`}{" "}
                </span>
                <span>{job.name}</span>
                <span> {` (${job.remark})`}</span>
                <br />
                <pre className=" ml-5 ">{job.description}</pre>
              </div>
            ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
