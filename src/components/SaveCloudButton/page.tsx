import { Button } from "../ui/button";

import { useUserContext } from "@/contexts/userContext";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";
import { CloudUploadIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";

export default function SaveCloudButton() {
  const { user } = useUserContext();
  const { loading, setLoading, jobs } = useJobContext();

  const onClick = async () => {
    if (user === null) return;
    setLoading(true);
    console.log("user id: ", user._id.toString());

    const res = await fetch("api/jobs/save", {
      method: "POST",

      body: JSON.stringify({ jobs, userId: `${user._id.toString()}` }),
    });
    if (res.ok === true) {
      console.log("result: ", res);

      toast.success("Save success", {
        description: "data saved to cloud",
      });
      setLoading(false);
    } else {
      console.log(res);

      toast.error("Error", {
        description: "",
      });
    }
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      disabled={user === null || loading ? true : false}
    >
      {loading ? <Spinner /> : <CloudUploadIcon />}
      Save
    </Button>
  );
}
