import { Job } from "@/lib/types/job";
import { PeriodType } from "@/lib/types/periodType";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { format, getMonth } from "date-fns";
import { Trash, ArrowUpDown, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { JobsContext } from "@/contexts/jobsContext";

import JobDetailDialog from "../JobDetailDialog/page";

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

    filterFn: (row, columnId, filterValue) => {
      if (filterValue === null) return true;
      console.log("filter val: ", filterValue);
      const startDate: Date = row.original.startDate;
      var month = getMonth(startDate) + 1;
      console.log("startDate: ", startDate);
      console.log("getMonth: ", month);

      if (month.toString() === filterValue) return true;
      return false;
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
  { accessorKey: "remark", header: "Remarks" },

  {
    id: "actions",
    cell: ({ row }) => {
      const { jobs, setJobs, setSelected, selected } = useContext(JobsContext);
      const job = row.original;

      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => {
              setSelected(row.index);
            }}
            disabled={selected === row.index}
          >
            <Pencil />
          </Button>
          <JobDetailDialog job={job} disabled={selected === row.index} />

          <Button
            variant="ghost"
            onClick={() => {
              const newJobs = jobs.filter(
                (data, index) => `${index}` !== row.id
              );
              setJobs(newJobs);
            }}
            disabled={selected === row.index}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
