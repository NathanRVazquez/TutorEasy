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
  name: z.string({
    required_error: "Name is required",
  }),
  shift: z.string({
    required_error: "Shift is required",
  }),
  class_section: z.string({
    required_error: "Class section is required",
  }),
  students: z.number().int().positive({
    message: "How many students did you tutor?",
  }),
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
      <div className="bg-[#7BA696] rounded-md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-around">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="TA" {...field} />
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
            <FormField
              control={form.control}
              name={"shift"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Shift Worked" {...field} />
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
            <FormField
              control={form.control}
              name={"class_section"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={"students"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="How many students did you tutor?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"chapter"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="What chapter are you covering today?"
                        {...field}
                      />
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
          <div className="flex justify-around">
            <FormField
              control={form.control}
              name={"concerns"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Type any existing concerns here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
};

export default TutorForm;
