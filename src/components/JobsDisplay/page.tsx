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
import { Separator } from "@/components/ui/separator";

import { DataTable } from "./dataTable";
import { Button } from "../ui/button";
import { Power, TimerReset } from "lucide-react";
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
import LoginDialog from "../LoginDialog/page";
import { useUserContext } from "@/contexts/userContext";
import FetchCloudButton from "../FetchCloudButton/page";
import SaveCloudButton from "../SaveCloudButton/page";
import { Spinner } from "../ui/spinner";
export default function JobsDisplay() {
  const { jobs, setJobs, setSelected, loading } = useContext(JobsContext);
  const { user, clearUser } = useUserContext();
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
            <div className="flex  items-center  space-x-2 ">
              {/* <Button className="ml-2" variant="outline">
                <UserRound /> Login
              </Button> */}
              {user ? <p>{user.username}</p> : <></>}
              {user === null ? (
                <LoginDialog />
              ) : (
                <Button
                  onClick={() => {
                    clearUser();
                    setJobs([]);
                  }}
                  variant="ghost"
                >
                  <Power />
                </Button>
              )}
            </div>
          </CardTitle>
          <CardDescription>display all jobs</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex h-5 items-center space-x-4 text-sm"> */}

          <div className="flex h-5 items-center  space-x-1 ">
            <JobExportButton />
            <JobImportButton />
            <Separator orientation="vertical" className="  mx-5 " />
            <FetchCloudButton />

            <SaveCloudButton />
          </div>
          {/* <Spinner /> */}

          <DataTable columns={columns} data={jobs} />
        </CardContent>
        <CardFooter className="flex items-center justify-between  ">
          <JobRawTextDialog />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <TimerReset />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Make sure you download your
                  progress as .JSON file before you delete the list permanently
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
        </CardFooter>
      </Card>
    </>
  );
}
