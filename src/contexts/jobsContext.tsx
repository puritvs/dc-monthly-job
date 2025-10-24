"use client";

import { Job } from "@/lib/types/job";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export const JobsContext = createContext<{
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  jobs: [],
  setJobs: () => {},
  selected: null,
  setSelected: () => {},
  loading: false,
  setLoading: () => {},
});

export default function JobsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <JobsContext.Provider
      value={{ jobs, setJobs, selected, setSelected, loading, setLoading }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobsContext);

  return context;
}
