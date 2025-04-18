"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobType } from "@/lib/types/jobType";
import { Job } from "@/lib/types/job";
import { useContext } from "react";
import { JobsContext } from "@/contexts/jobsContext";

const formSchema = z.object({
  type: z.nativeEnum(JobType),

  name: z.string().min(1, { message: "name must not be empty" }),
});
export default function JobForm() {
  const { jobs, setJobs } = useContext(JobsContext);
  const form = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: Job) => {
    console.log("submit: ", data);
    setJobs([...jobs, data]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className=" m-5 min-w-sm">
          <CardHeader>
            <CardTitle>Add job</CardTitle>
            <CardDescription>
              add job list to create job summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={JobType.DANCER}>Dancer</SelectItem>
                          <SelectItem value={JobType.CHOREOGRAPHER}>
                            Choreographer
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="enter job name" {...field} />
                      </FormControl>
                      {/* {form.formState.errors["name"] ? (
                        <FormDescription>
                          {form.formState.errors["name"].message}
                        </FormDescription>
                      ) : (
                        <></>
                      )} */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">Add</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
