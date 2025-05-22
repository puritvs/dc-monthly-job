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
import { useEffect } from "react";
export default function LoginDialog() {
  const fetchAccount = async () => {
    const result = await fetch("/api/accounts");

    console.log("fetch result: ", await result.json());
  };

  // useEffect(() => {
  //   fetchAccount();
  // }, []);
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
        <div className="flex flex-col"></div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={fetchAccount}>Login</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
