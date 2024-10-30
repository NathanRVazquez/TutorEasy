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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
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
  scheduleRecurring: z.boolean().default(false).optional(),
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
      scheduleRecurring: false,
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
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem className="w-full rounded-md">
                  <FormLabel>Name of TA</FormLabel>
                  <FormControl className="bg-white">
                    <Input {...field} placeholder="Enter the name of the TA" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 px-2">
            <FormField
              control={form.control}
              name={"emplid"}
              render={({ field }) => (
                <FormItem className="w-full rounded-md">
                  <FormLabel>TA EMPLID</FormLabel>
                  <FormControl className="bg-white">
                    <Input {...field} placeholder="Enter the TA's EMPLID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 px-2">
            <FormField
              control={form.control}
              name={"class_section"}
              render={({ field }) => (
                <FormItem className="w-full rounded-md">
                  <FormLabel>Class</FormLabel>
                  <FormControl className="bg-white">
                    <Select onValueChange={field.onChange} defaultValue={""}>
                      <SelectTrigger className="bg-white">
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
            <div className="flex flex-row items-center">
              <Label>TA Schedule</Label>
              <FormField
                control={form.control}
                name={"scheduleRecurring"}
                render={({ field }) => (
                  <FormItem className="px-6">
                    <FormControl className="bg-white">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="pl-2">Recurring?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name={"scheduleDay"}
                  render={({ field }) => (
                    <FormItem className="w-full rounded-md">
                      <FormLabel>Day</FormLabel>
                      <FormControl className="bg-white">
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
                <FormField
                  control={form.control}
                  name={"scheduleStartTime"}
                  render={({ field }) => (
                    <FormItem className="w-full rounded-md">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl className="bg-white">
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
              <Label className="items-end">to</Label>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name={"scheduleEndTime"}
                  render={({ field }) => (
                    <FormItem className="w-full rounded-md">
                      <FormLabel>End Time</FormLabel>
                      <FormControl className="bg-white">
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
              <div className="flex flex-col justify-end">
                <Button
                  type="button"
                  className="bg-custom-orange text-white hover:bg-custom-yellow"
                >
                  Add Another Shift
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-custom-yellow drop-shadow-lg rounded-3xl text-white hover:bg-custom-orange"
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
