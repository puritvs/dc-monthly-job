import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Calendar, Eye } from "lucide-react";
import { Job } from "@/lib/types/job";
import { format } from "date-fns";
import { PeriodType } from "@/lib/types/periodType";
import { Badge } from "../ui/badge";
export default function JobDetailDialog({
  job,
  disabled,
}: {
  job: Job;
  disabled: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={disabled}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{job.name} </DialogTitle>
          <DialogDescription>
            <Badge>{job.type}</Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <Label>
            <Calendar size={15} />
            {format(job.startDate, "dd/MM/yyyy")}{" "}
            {job.periodType === PeriodType.PERIOD &&
              `- ${format(job.endDate, "dd/MM/yyyy")}`}
          </Label>
          <Separator className="my-4" />

          <pre>{job.description} </pre>
          <Separator className="my-4" />

          <span>{job.remark}</span>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
