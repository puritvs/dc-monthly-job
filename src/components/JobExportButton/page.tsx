"use client";
import { Button } from "../ui/button";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";

export default function JobExportButton() {
  const { jobs } = useJobContext();

  const onClick = async () => {
    var result = await fetch("api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobs),
    });
    if (result.status === 200) {
      toast.success("Progress saved", {
        description: "saved to .JSON file",
      });
    }
  };

  return (
    <Button variant="outline" onClick={onClick}>
      Export .JSON
    </Button>
  );
}
