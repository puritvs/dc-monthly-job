import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Calendar, Eye, UserRound } from "lucide-react";
import { Job } from "@/lib/types/job";
import { format } from "date-fns";
import { PeriodType } from "@/lib/types/periodType";
import { Badge } from "../ui/badge";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../ui/input";
import { IAccount } from "@/models/Accounts";
import { useUserContext } from "@/contexts/userContext";
import { useJobContext } from "@/contexts/jobsContext";

export default function TestCloudButton() {
  const { user } = useUserContext();
  const { setJobs } = useJobContext();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClick = async () => {
    if (user === null) return;
    const res = await fetch("api/jobs", {
      method: "POST",

      body: JSON.stringify({ ...user }),
    });
    console.log("res: ", res);

    const result: Job[] = JSON.parse(await res.json());
    console.log("result: ", result);
    setJobs(result);
    // const result: IAccount = await res.json();

    // storeUser(result);
    // setOpen(false);
  };

  return (
    <Button onClick={onClick} disabled={user === null ? true : false}>
      TEST Cloud
    </Button>
  );
}
