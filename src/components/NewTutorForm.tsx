"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatetimePicker } from "@/components/ui/datetime-picker";

import { useToast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  emplid: z
    .string()
    .min(8, "EMPLID must be 8 digits")
    .max(8, "EMPLID must be 8 digits")
    .refine((val) => /^\d{8}$/.test(val), {
      message: "EMPLID must be a number",
    }),
  email: z.string().email("Invalid email address"),
  class_section: z.string().min(1, "Class section is required"),
  schedule: z.array(
    z.object({
      day: z
        .string({
          required_error: "Day is required",
        })
        .min(1, "Day is required"),
      start_time: z.coerce.date({
        required_error: "Start time is required",
      }),
      end_time: z.coerce.date({
        required_error: "End time is required",
      }),
    })
  ),
});

export default function TutoringSessionForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      emplid: "",
      email: "",
      class_section: "",
      schedule: [
        {
          day: "",
          start_time: new Date(),
          end_time: new Date(),
        },
      ],
    },
  });

  const { toast } = useToast();

  function addNewInputs() {
    form.setValue("schedule", [
      ...form.getValues("schedule"),
      {
        day: "",
        start_time: new Date(),
        end_time: new Date(),
      },
    ]);
  }

  function deleteInput(index: number) {
    const schedule = form.getValues("schedule");
    if (schedule.length > 1) {
      form.setValue(
        "schedule",
        schedule.filter((_, i) => i !== index)
      );
    }
  }

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    // this is where we send the form data to the db

    const formData = {
      ...values,
      schedule: values.schedule.map((s) => ({
        ...s,
        start_time: s.start_time.toTimeString(),
        end_time: s.end_time.toTimeString(),
      })),
    };

    console.log(formData);
    try {
      // send the form data to the db
      toast({
        title: "Form submitted",
        description: "The TA has been added to the class section!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error submitting form",
        description: `${error}`,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">TA Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Middle Last" {...field} />
                </FormControl>
                <FormDescription className="font-bold">
                  Enter the TAs Name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"emplid"}
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">EMPLID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="12345678" {...field} />
                </FormControl>
                <FormDescription className="font-bold">
                  Enter the TA's EMPLID
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@myhunter.cuny.edu" {...field} />
                </FormControl>
                <FormDescription className="font-bold">
                  Enter the TA's email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name={"class_section"}
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">Class Section</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={""}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Choose a class Section"
                      {...field}
                      className="font-bold"
                    />
                  </SelectTrigger>
                  <SelectContent className="font-semibold">
                    {/* This should be a list of class sections where the professor id matches the professor id in the class section for all class sections */}
                    <SelectItem value="CS 127 - 1283x">
                      CS 127 - 1283x
                    </SelectItem>
                    <SelectItem value="CS 135 - 0056">CS 135 - 0056</SelectItem>
                    <SelectItem value="CS 235 - 7561">CS 235 - 7561</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="font-bold">
                  Enter the class section you want this TA to be enrolled in
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-400">
            Assigned Schedule:
          </h2>
          <div>
            <p className="text-sm font-semibold">
              Choose the days and times the TA is available for tutoring. These
              can be edited later.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {form.watch("schedule").map((_, index) => (
            <div
              className={cn(
                `${
                  index >= 0 ? "pl-8 border-slate-200 border-l-[2px]" : "pl-0"
                }`,
                "space-y-2"
              )}
              key={index}
            >
              <FormField
                control={form.control}
                name={`schedule.${index}.day`}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3">
                    <FormLabel className="font-bold">Day</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={""}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a day of the week"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent className="font-semibold">
                          <SelectItem value="Monday">Monday</SelectItem>
                          <SelectItem value="Tuesday">Tuesday</SelectItem>
                          <SelectItem value="Wednesday">Wednesday</SelectItem>
                          <SelectItem value="Thursday">Thursday</SelectItem>
                          <SelectItem value="Friday">Friday</SelectItem>
                          <SelectItem value="Saturday">Saturday</SelectItem>
                          <SelectItem value="Sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name={`schedule.${index}.start_time`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Shift Start Time
                      </FormLabel>
                      <DatetimePicker
                        {...field}
                        format={[[], ["hours", "minutes", "am/pm"]]}
                      />
                      <FormDescription className="font-bold">
                        Select the start shift time.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`schedule.${index}.end_time`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Shift End Time
                      </FormLabel>
                      <DatetimePicker
                        {...field}
                        format={[[], ["hours", "minutes", "am/pm"]]}
                      />
                      <FormDescription className="font-bold">
                        Select the end shift time.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => deleteInput(index)}
                  className="bg-red-400 hover:bg-red-500 rounded-md text-white font-semibold mt-2"
                >
                  Delete
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            onClick={addNewInputs}
            className="bg-blue-400 hover:bg-blue-500 text-sm rounded-md text-white font-semibold"
          >
            Add Shift
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-custom-yellow hover:bg-custom-orange rounded-lg text-white font-semibold drop-shadow-xl"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
