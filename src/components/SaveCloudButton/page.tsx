import { Button } from "../ui/button";
import { Job } from "@/lib/types/job";

import { useUserContext } from "@/contexts/userContext";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";

export default function SaveCloudButton() {
  const { user } = useUserContext();
  const { loading, setLoading, jobs } = useJobContext();

  const onClick = async () => {
    if (user === null) return;
    // setLoading(true);
    console.log("user id: ", user._id.toString());

    const res = await fetch("api/jobs/save", {
      method: "POST",

      body: JSON.stringify({ jobs, userId: `${user._id.toString()}` }),
    });
    var response: Response = JSON.parse(await res.json());
    // console.log("res: ", res.json());
    console.log("res status: ", response.ok);
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
