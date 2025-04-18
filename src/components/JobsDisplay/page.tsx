"use client";

import { JobsContext } from "@/contexts/jobsContext";
import { Job } from "@/lib/types/job";
import { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function JobsDisplay() {
  const { jobs } = useContext(JobsContext);

  return (
    <>
      <Card className=" m-5 min-w-sm ">
        <CardHeader>
          <CardTitle>All jobs</CardTitle>
          <CardDescription>display all jobs</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.map((job: Job) => (
            <div>
              <span> {`${job.type} - ${job.name}`} </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
