"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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
import { useContext, useEffect } from "react";
import { JobsContext } from "@/contexts/jobsContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PeriodType } from "@/lib/types/periodType";
import { describe } from "node:test";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  type: z.nativeEnum(JobType),

  name: z.string().min(1, { message: "name must not be empty" }),
  periodType: z.nativeEnum(PeriodType),
  startDate: z.date({ required_error: "job start date is required" }),
  endDate: z.date({ required_error: "job start date is required" }),
  description: z.string(),
  remark: z.string(),
});
const defaultValues = {
  type: JobType.DANCER,
  name: "",
  periodType: PeriodType.SINGLE_DATE,
  startDate: new Date(),
  endDate: new Date(),
  description: "",
  remark: "",
};
export default function JobForm() {
  const { jobs, setJobs,selected,setSelected } = useContext(JobsContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: Job) => {
    if(selected !== null){
      var newJobs:Job[] = jobs;
      newJobs[selected] = data
      console.log('new jobs: ', newJobs);
      
      setJobs([...newJobs]);
      setSelected(null)
    }else setJobs([...jobs, data]);
  };
  const periodType = form.watch("periodType");
  const startDate = form.watch("startDate");
  useEffect(() => {
    if (periodType === PeriodType.SINGLE_DATE)
      form.setValue("endDate", startDate);
    return () => {};
  }, [startDate, periodType]);

  useEffect(()=>{
    
    if(selected !== null){
      console.log('selected: ', jobs[selected]);
      
      var job:Job = {
        ...jobs[selected],

      }
      form.reset({...jobs[selected],  startDate: new Date(jobs[selected].startDate), endDate: new Date(jobs[selected].endDate)});
      form.setValue('type',JobType.CHOREOGRAPHER )
      form.trigger();
    }

  },[selected])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className=" sm:m-2 md:m-5">
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
                        <Input placeholder="Enter job name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="periodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period Type</FormLabel>
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
                          <SelectItem value={PeriodType.SINGLE_DATE}>
                            Single Day
                          </SelectItem>
                          <SelectItem value={PeriodType.PERIOD}>
                            Period
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                            
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={periodType !== PeriodType.PERIOD}
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your job details here..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Additional details of the job
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="remark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Add</Button>
            {selected !== null && <Button type='submit'  >Edit</Button>}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
