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
import { TimerReset, TriangleAlert } from "lucide-react";
import { columns } from "./columns";
import { JobRawTextDialog } from "../JobRawTextDialog/page";
import JobImportButton from "../JobImportButton/page";
import JobExportButton from "../JobExportButton/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function JobsDisplay() {
  const { jobs, setJobs, setSelected } = useContext(JobsContext);

  const onReset = () => {
    setJobs([]);
    setSelected(null);
  };
  return (
    <>
      <Card className=" sm:m-2 md:m-5 min-w-250 ">
        <CardHeader>
          <CardTitle className="flex justify-between ">
            All Jobs
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Reset <TimerReset />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Make sure you download your
                    progress as .JSON file before you delete the list
                    permanently
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onReset}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
