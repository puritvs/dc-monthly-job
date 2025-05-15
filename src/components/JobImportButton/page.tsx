"use client";
import { ChangeEvent, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";
import { Job } from "@/lib/types/job";

export default function JobImportButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setJobs } = useJobContext();

  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    var fileList: File[] =
      e.currentTarget.files === null ? [] : Array.from(e.currentTarget.files);

    const fileReader = new FileReader();

    fileReader.readAsText(fileList[0]);

    fileReader.onloadend = (ev: ProgressEvent<FileReader>) => {
      if (ev.target?.result) {
        var importedJobs: Job[] = JSON.parse(ev.target.result.toString());
        setJobs(importedJobs);
        toast.success("Import success", {
          description: "current jobs are replaced",
        });
      }
    };
    e.target.files = null;
  };

  return (
    <div className="flex space-x-1">
      <Button
        variant="outline"
        onClick={() => {
          /**
           * reset file input so that it accepts the same file (a better solution might exists)
           */
          if (fileInputRef.current) {
            if (fileInputRef.current.value) {
              fileInputRef.current.value = "";
            }
          }

          fileInputRef.current?.click();
        }}
      >
        Import .JSON
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
