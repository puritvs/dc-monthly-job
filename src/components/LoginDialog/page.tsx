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
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
const formSchema = z.object({
  username: z.string({ required_error: "username required" }),
  password: z.string({ required_error: "password required" }),
});

export default function LoginDialog() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    console.log("res: ", await res.json());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <UserRound />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            <Badge>Authentication</Badge>
          </DialogDescription>
        </DialogHeader>

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

        <div className="flex flex-col"></div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={onSubmit}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
