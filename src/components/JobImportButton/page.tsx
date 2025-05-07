"use client";
import { ChangeEvent, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";

export default function JobImportButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { jobs } = useJobContext();

  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("file selected: ", e.currentTarget.files);

    // const result = fs.writeFile('')
  };
  return (
    <div>
      <Button
        variant="outline"
        onClick={async () => {
          var result = await fetch("api/jobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jobs),
          });
          console.log(result);
          if (result.status === 200) {
            toast("Progress saved");
          }
        }}
      >
        Save (.JSON)
      </Button>
      <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
        Import
      </Button>
      <Input
        ref={fileInputRef}
        id="importJSON"
        accept=".json"
        type="file"
        onChange={onFileSelect}
        hidden
      />
    </div>
  );
}
