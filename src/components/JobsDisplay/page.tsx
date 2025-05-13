"use client";

import { JobsContext } from "@/contexts/jobsContext";
import { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "./dataTable";
import { Button } from "../ui/button";
import { TimerReset } from "lucide-react";
import { columns } from "./columns";
import { JobRawTextDialog } from "../JobRawTextDialog/page";
import JobImportButton from "../JobImportButton/page";
import JobExportButton from "../JobExportButton/page";

export default function JobsDisplay() {
  const { jobs, setJobs, setSelected } = useContext(JobsContext);

  return (
    <>
      <Card className=" sm:m-2 md:m-5">
        <CardHeader>
          <CardTitle>
            All Jobs
            <Button
              variant="outline"
              onClick={() => {
                setJobs([]);
                setSelected(null);
              }}
            >
              Reset <TimerReset />
            </Button>
          </CardTitle>
          <CardDescription>display all jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-1 ">
            <JobExportButton />
            <JobImportButton />
          </div>

          <DataTable columns={columns} data={jobs} />
        </CardContent>
        <CardFooter>
          <JobRawTextDialog />
        </CardFooter>
      </Card>
    </>
  );
}
