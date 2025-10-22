import { Button } from "../ui/button";
import { Job } from "@/lib/types/job";

import { useUserContext } from "@/contexts/userContext";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";

export default function SaveCloudButton() {
  const { user } = useUserContext();
  const { setJobs, jobs } = useJobContext();

  const onClick = async () => {
    if (user === null) return;
    console.log("user id: ", user._id.toString());

    const res = await fetch("api/jobs/save", {
      method: "POST",

      body: JSON.stringify({ jobs, userId: `${user._id.toString()}` }),
    });
    console.log("res: ", res.json());

    // toast.success("Save success", {
    //   description: "data fetched from cloud",
    // });
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      disabled={user === null ? true : false}
    >
      Save to Cloud
    </Button>
  );
}
