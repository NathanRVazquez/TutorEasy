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

const schema = z.object({
  //creating schema for form validation
  name: z.string({ message: "Name is required" }),
  emplid: z
    .string()
    .length(8, { message: "Enter TA EMPLID" })
    .refine((val) => /^\d{8}$/.test(val), {
      message: "EMPLID must be a number",
    }),
  class_section: z.string({
    required_error: "Class section is required",
    message: "Classes",
  }),
  scheduleDay: z.string({
    required_error: "Schedule is required",
    message: "Schedule",
  }),
  scheduleStartTime: z.string({
    required_error: "Schedule start time is required",
    message: "Schedule",
  }),
  scheduleEndTime: z.string({
    required_error: "Schedule end time is required",
    message: "Schedule",
  }),
  scheduleRecurring: z.boolean({
    message: "Recurring",
  }),
});

const NewTutorForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      emplid: "",
      class_section: "",
      scheduleDay: "",
      scheduleStartTime: "",
      scheduleEndTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    // this is where we send the form data to the db
  }

  return (
    <Form {...form}>
      <h1 className="text-3xl">Add a New TA to Your Class!</h1>
      <div className="bg-secondary-green rounded-md p-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-4 px-2">
            <h1 className="text-xl pb-3">Name of TA</h1>
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem className="w-full bg-white rounded-md">
                  <FormControl>
                    <Input {...field} placeholder="Enter the name of the TA" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 px-2">
            <h1 className="text-xl pb-3">TA EMPLID</h1>
            <FormField
              control={form.control}
              name={"emplid"}
              render={({ field }) => (
                <FormItem className="w-full bg-white rounded-md">
                  <FormControl>
                    <Input {...field} placeholder="Enter the TA's EMPLID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 px-2">
            <h1 className="text-xl pb-3">Class</h1>
            <FormField
              control={form.control}
              name={"class_section"}
              render={({ field }) => (
                <FormItem className="w-full bg-white rounded-md">
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Classes" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test1">test1</SelectItem>
                        <SelectItem value="test2">test2</SelectItem>
                        <SelectItem value="test3">test3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 px-2">
            <h1 className="text-xl pb-3">TA Schedule</h1>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <h1 className="text-xl">Day</h1>
                <FormField
                  control={form.control}
                  name={"scheduleDay"}
                  render={({ field }) => (
                    <FormItem className="w-full bg-white rounded-md">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Day of the Week"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl">Start Time</h1>
                <FormField
                  control={form.control}
                  name={"scheduleStartTime"}
                  render={({ field }) => (
                    <FormItem className="w-full bg-white rounded-md">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Start Time"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <h1 className="text-xl">to</h1>
              <div className="flex flex-col">
                <h1 className="text-xl">End Time</h1>
                <FormField
                  control={form.control}
                  name={"scheduleEndTime"}
                  render={({ field }) => (
                    <FormItem className="w-full bg-white rounded-md">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="End Time"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                className="bg-custom-orange text-white hover:bg-custom-yellow"
              >
                Add Another Shift
              </Button>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-custom-yellow text-white hover:bg-custom-orange"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default NewTutorForm;
