"use client";
import { Button } from "../ui/button";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { format } from "date-fns";
export default function JobExportButton() {
  const { jobs } = useJobContext();

  const onClick = async () => {
    try {
      var filename = `${format(new Date(), "yyyyMMddkkmmss")}-jobs.json`;

      var blob = new Blob([JSON.stringify(jobs)], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, filename);
    } catch (e) {
      console.log("save error: ", e);
    }

    // var result = await fetch("api/jobs", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(jobs),
    // });
    // if (result.status === 200) {
    //   toast.success("Progress saved", {
    //     description: "saved to .JSON file",
    //   });
    // }
  };

  return (
    <Button variant="outline" onClick={onClick}>
      Download .JSON
    </Button>
  );
}
