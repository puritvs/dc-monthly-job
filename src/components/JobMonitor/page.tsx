"use client";

import Jobs from "@/models/Jobs";
import { useEffect } from "react";

export default async function JobMonitor() {
  const myJobs = await Jobs.watch();

  useEffect(() => {
    console.log("change: ", myJobs.next());
  }, [myJobs]);

  return (
    <>
      <div className="flex w-full">
        <p>Job monitor</p>
      </div>
    </>
  );
}
