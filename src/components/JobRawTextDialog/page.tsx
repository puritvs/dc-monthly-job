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
import { useContext, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Job } from "@/lib/types/job";
import { PenTool } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { jobToText } from "@/lib/utils";

export function JobRawTextDialog() {
  const { jobs } = useContext(JobsContext);
  const [isCopied, setIsCopied] = useState(false);

  const sortByStartDate = (a: Job, b: Job) => {
    if (a.startDate === b.startDate) return 0;
    else if (a.startDate < b.startDate) return -1;
    else return 1;
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Raw Text <PenTool />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Raw</DialogTitle>
          <DialogDescription>Formatted job summary</DialogDescription>
        </DialogHeader>

        <Label>{JobType.CHOREOGRAPHER}</Label>
        <Textarea
          className="w-full h-9/12 "
          defaultValue={jobToText(jobs)}
          // disabled={true}
        />
        {/* <ScrollArea className=" h-full  w-fit ">
          {jobs
            .sort((a: Job, b: Job) => sortByStartDate(a, b))
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
            .sort((a: Job, b: Job) => sortByStartDate(a, b))
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
        </ScrollArea> */}
        {/* <DialogFooter>
          <Button>Copy</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
