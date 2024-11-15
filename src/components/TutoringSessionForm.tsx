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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  shift: z.string({
    required_error: "Shift is required",
  }),
  class_section: z.string({
    required_error: "Class section is required",
  }),
  students: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "How many students did you tutor?",
    })
    .transform((val) => Number(val)),
  chapter: z.string({
    required_error: "Chapter is required",
    message: "Which chapter are you covering today?",
  }),
  concerns: z.string({
    message: "Type any existing concerns",
  }),
});

const TutorForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      shift: "",
      class_section: "",
      students: 0,
      chapter: "",
      concerns: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    // this is where we send the form data to the db
  }

  return (
    <Form {...form}>
      <div className="bg-white rounded-md p-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-around space-x-4">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem className="w-full rounded-md">
                  <FormLabel className="font-bold">TA Name</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={""}>
                      <SelectTrigger>
                        <SelectValue placeholder="TA" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test1">Nathan Vazquez</SelectItem>
                        <SelectItem value="test2">
                          Ynalois Pangilinan
                        </SelectItem>
                        <SelectItem value="test3">Shohruz Ernazarov</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="font-bold">
                    Select your name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"shift"}
              render={({ field }) => (
                <FormItem className="w-full bg-white rounded-md">
                  <FormLabel className="font-bold">Shift</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Shift Worked" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test1">1:00 PM - 2:30 PM</SelectItem>
                        <SelectItem value="test2">2:30 PM - 4:00 PM</SelectItem>
                        <SelectItem value="test3">4:00 PM - 5:30 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="font-bold">
                    Select your scheduled shift
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"class_section"}
              render={({ field }) => (
                <FormItem className="w-full bg-white rounded-md">
                  <FormLabel className="font-bold">Class Section</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Class Section" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test1">test1</SelectItem>
                        <SelectItem value="test2">test2</SelectItem>
                        <SelectItem value="test3">test3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="font-bold">
                    Select the class section
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={"students"}
            render={({ field }) => (
              <FormItem className="w-full mt-4 bg-white rounded-md">
                <FormLabel className="font-bold">Students Tutored</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="How many students did you tutor?"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="font-bold">
                  Enter the amount of students you tutored
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"chapter"}
            render={({ field }) => (
              <FormItem className="w-full mt-4 bg-white rounded-md">
                <FormLabel className="font-bold">Chapter</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={""}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="What chapter are you covering today?"
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test1">Chapter 1</SelectItem>
                      <SelectItem value="test2">Chapter 2</SelectItem>
                      <SelectItem value="test3">Chapter 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Which chapter are you covering today?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-around mt-4">
            <FormField
              control={form.control}
              name={"concerns"}
              render={({ field }) => (
                <FormItem className="w-full bg-white rounded-md">
                  <FormLabel className="font-bold">Concerns</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24"
                      placeholder="Write any concerns here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter student struggles and areas of concern
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-custom-yellow hover:bg-custom-orange rounded-3xl text-white font-semibold drop-shadow-xl"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default TutorForm;
