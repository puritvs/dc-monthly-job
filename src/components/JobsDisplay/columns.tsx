import { Job } from "@/lib/types/job";
import { PeriodType } from "@/lib/types/periodType";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Delete, DeleteIcon, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { JobsContext } from "@/contexts/jobsContext";
export const columns: ColumnDef<Job>[] = [
  { accessorKey: "type", header: "Job Type" },
  { accessorKey: "name", header: "Job Name" },
  { accessorKey: "periodType", header: "Period Type" },
  {
    accessorKey: "startDate",
    header: "Start Date",
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
    id: "actions",
    cell: ({ row }) => {
      const { jobs, setJobs } = useContext(JobsContext);
      const job = row.original;

      return (
        <Button
          variant="ghost"
          onClick={() => {
            const newJobs = jobs.filter((data, index) => `${index}` !== row.id);
            setJobs(newJobs);
          }}
        >
          <Trash />
        </Button>
      );
    },
  },
];
