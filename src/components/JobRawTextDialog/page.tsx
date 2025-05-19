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
import { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Job } from "@/lib/types/job";
import { PenTool } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { jobToText } from "@/lib/utils";
import fs from "fs";
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
  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("file selected: ", e.currentTarget.files);

    // const result = fs.writeFile('')
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PenTool />
          Raw Text
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Raw</DialogTitle>
          <DialogDescription>Formatted job summary</DialogDescription>
        </DialogHeader>

        <Textarea
          className="w-full min-h-100"
          spellCheck={false}
          defaultValue={jobToText(jobs)}
          // disabled={true}
        />
        <Label htmlFor="textfile">Save</Label>
        <Input
          id="textfile"
          accept=".txt"
          type="file"
          onChange={onFileSelect}
        />
      </DialogContent>
    </Dialog>
  );
}
