"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  class_name: z.string(),
  class_section: z.string(),
  tutoring_guideline: z.string(),
});

type FormData = z.infer<typeof schema>;

interface CreateClassFormProps {
  createClass: (
    className: string,
    classSection: number,
    tutoringGuidelines: string
  ) => Promise<void>;
}

export default function CreateClassForm({ createClass }: CreateClassFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      class_name: "",
      class_section: "",
      tutoring_guideline: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);
    // Handle form submission

    const data = {
      className: values.class_name,
      classSection: Number(values.class_section),
      tutoringGuidelines: values.tutoring_guideline,
    };

    try {
      await createClass(
        data.className,
        data.classSection,
        data.tutoringGuidelines
      );
    } catch (error) {
      console.error("Error creating class:", error);
      throw new Error("Failed to create class");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="class_name"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter class name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class_section"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">Class Section</FormLabel>
                <FormControl>
                  <Input placeholder="Enter class section" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tutoring_guideline"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/3">
                <FormLabel className="font-bold">Tutoring Guideline</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tutoring guideline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#E8C945] hover:bg-[#D38D30] text-white font-semibold drop-shadow-xl"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
