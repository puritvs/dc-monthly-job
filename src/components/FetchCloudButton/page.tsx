import { Button } from "../ui/button";
import { Job } from "@/lib/types/job";

import { useUserContext } from "@/contexts/userContext";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";

export default function FetchCloudButton() {
  const { user } = useUserContext();
  const { setJobs } = useJobContext();

  const onClick = async () => {
    if (user === null) return;
    const res = await fetch("api/jobs", {
      method: "POST",

      body: JSON.stringify({ ...user }),
    });
    console.log("res: ", res);

    const result: Job[] = JSON.parse(await res.json());
    console.log("result: ");
    setJobs(result);
    toast.success("Fetch success", {
      description: "data fetched from cloud",
    });
    // const result: IAccount = await res.json();

    // storeUser(result);
    // setOpen(false);
  };

  return (
    <Button
      onClick={onClick}
      variant="secondary"
      disabled={user === null ? true : false}
    >
      Fetch from Cloud
    </Button>
  );
}
