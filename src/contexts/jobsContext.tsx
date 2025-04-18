"use client";

import { Job } from "@/lib/types/job";
import { createContext, useState, Dispatch, SetStateAction } from "react";

export const JobsContext = createContext<{
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
}>({
  jobs: [],
  setJobs: () => {},
});

export default function JobsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
}
