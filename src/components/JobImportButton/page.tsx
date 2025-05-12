"use client";
import { ChangeEvent, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useJobContext } from "@/contexts/jobsContext";
import { toast } from "sonner";
import { Job } from "@/lib/types/job";

export default function JobImportButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { jobs,setJobs } = useJobContext();

  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    var fileList: File[] =
      e.currentTarget.files === null ? [] : Array.from(e.currentTarget.files);

    console.log("fileList length: ", fileList.length);

    if (fileList.length >= 1) {
      console.log("file: ", fileList[0]);
    }
    const fileReader = new FileReader()

    fileReader.readAsText(fileList[0])

    fileReader.onloadend = (ev:ProgressEvent<FileReader>)=>{
      
      if(ev.target?.result){

        var importedJobs:Job[] = JSON.parse(ev.target.result.toString()  );
        console.log("imported: ", importedJobs);
        setJobs(importedJobs);
        toast.success("Import success", {
          description: "current jobs are replaced",
        });
      }
       
    }
    e.target.files = null;

  
  };
  // useEffect(()=>{

  //   if(fileReader.result){
  //     console.log(fileReader.result);
      
  //   }
  // },[fileReader.result])

  return (
    <div className="flex space-x-1">
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
          if (result.status === 200) {
            toast.success("Progress saved", {
              description: "saved to .JSON file",
            });
          }
        }}
      >
        Export .JSON
      </Button>
      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
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
