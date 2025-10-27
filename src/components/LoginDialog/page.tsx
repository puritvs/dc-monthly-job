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

export default function LoginDialog() {
  const { storeUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    console.log("submitted");

    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const result: IAccount = await res.json();

    storeUser(result);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild> */}
      <Button variant="ghost" onClick={() => setOpen(true)}>
        <UserRound />
      </Button>
      {/* </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            <Badge>Authentication</Badge>
          </DialogDescription>
        </DialogHeader>
        <form className="w-full max-w-sm" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            ></Input>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </div>

          <Button type="submit">Login</Button>
        </form>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
