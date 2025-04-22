import { Job } from "@/lib/types/job";
import { PeriodType } from "@/lib/types/periodType";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash, ArrowUpDown, Pencil, Eye } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { JobsContext } from "@/contexts/jobsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
export const columns: ColumnDef<Job>[] = [
  { accessorKey: "periodType", header: "Period" },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startDate: Date = row.getValue("startDate");
      const formatted = format(startDate, "dd/MM/uuuu");
      return formatted;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      if (row.getValue("periodType") === PeriodType.SINGLE_DATE) return "-";
      const endDate: Date = row.getValue("endDate");
      const formatted = format(endDate, "dd/MM/uuuu");
      return formatted;
    },
  },
  {
    accessorKey: "type",
    header: "Job Type",
  },
  { accessorKey: "name", header: "Job Name" },

  {
    id: "actions",
    cell: ({ row }) => {
      const { jobs, setJobs } = useContext(JobsContext);
      const job = row.original;
      console.log(job);

      return (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{job.name} </DialogTitle>
                <DialogDescription>{job.type}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col">
                <Label>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                onClick={() => {
                  const newJobs = jobs.filter(
                    (data, index) => `${index}` !== row.id
                  );
                  setJobs(newJobs);
                }}
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
