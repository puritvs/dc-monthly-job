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
import { Calendar, Eye, LockIcon, UserRound } from "lucide-react";
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
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Spinner } from "../ui/spinner";

export default function LoginDialog() {
  const { storeUser } = useUserContext();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    console.log("submitted");
    setSubmitting(true);

    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const result: IAccount = await res.json();
    setSubmitting(false);
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
          <DialogTitle>
            <div className=" flex flex-row items-center gap-1 ">
              <LockIcon /> Authentication
            </div>
          </DialogTitle>
        </DialogHeader>
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitted");
            onSubmit();
          }}
        >
          <FieldSet disabled={submitting}>
            <FieldGroup>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  placeholder="Type your username..."
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>

                <Input
                  type="password"
                  placeholder="Type your password..."
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
              </Field>
              <Field orientation="horizontal">
                <Button variant="secondary" type="submit">
                  {submitting && <Spinner />}
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
