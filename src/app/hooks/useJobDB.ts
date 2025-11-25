import { useJobContext } from "@/contexts/jobsContext";
import { useUserContext } from "@/contexts/userContext";
import { connectToMongoDB } from "@/lib/mongodb";
import { Job } from "@/lib/types/job";
import { useEffect } from "react";
import { JobStatus } from "@/lib/types/jobStatus";
import { toast } from "sonner";

const useJobDB = () => {
  const { user } = useUserContext();
  const { setLoading, setJobs, setStatus } = useJobContext();
  const refetch = async () => {
    if (user === null) return;
    setLoading(true);
    const res = await fetch("api/jobs", {
      method: "POST",

      body: JSON.stringify({ ...user }),
    });

    if (res.ok === true) {
      var result: Job[] = JSON.parse(await res.json());
      setStatus(new Array(result.length).fill(JobStatus.UNCHANGED));
      console.log("result: ");

      setJobs(result);
      toast.success("Fetch success", {
        description: "data fetched from cloud",
      });
      setLoading(false);
    } else {
      console.log(res);

      toast.error("Error", {
        description: "",
      });
    }
  };
  const insertJob = async (data: Job) => {
    var result = await fetch("api/jobs/cloud/create", {
      method: "POST",
      body: JSON.stringify({ job: data, userId: user?._id }),
    });
    console.log("result: ", result);
    await refetch();
  };
  const editJob = async (data: Job) => {
    var result = await fetch("api/jobs/cloud/edit", {
      method: "POST",
      body: JSON.stringify({ job: data, userId: user?._id }),
    });
    console.log("result: ", result);
    await refetch();
  };
  const deleteJob = async (data: Job) => {
    var result = await fetch("api/jobs/cloud/delete", {
      method: "POST",
      body: JSON.stringify({ job: data, userId: user?._id }),
    });
    console.log("result: ", result);
    await refetch();
  };

  useEffect(() => {
    refetch();
  }, []);
  return { refetch, insertJob, editJob, deleteJob };
};

export default useJobDB;
