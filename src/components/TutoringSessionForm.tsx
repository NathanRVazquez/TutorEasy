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
import { DatetimePicker } from "@/components/ui/datetime-picker";

import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  start_time: z.coerce.date({
    required_error: "Start time is required",
  }),
  end_time: z.coerce.date({
    required_error: "End time is required",
  }),
  students: z.coerce
    .number({
      required_error: "Number of students is",
    })
    .min(0, "Number of students is required")
    .refine((value) => value >= 0, {
      message: "Number of students must be greater than or equal to 0",
    }),
  topics: z
    .array(
      z.object({
        topic: z
          .string({
            required_error: "Topic is required",
          })
          .min(1, "Topic is required"),
        observations: z
          .string({
            required_error: "Observations are required",
          })
          .min(1, "Observations are required"),
      })
    )
    .min(1, "At least one topic is required"),
});

export default function TutoringSessionForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      start_time: new Date(),
      end_time: new Date(),
      students: 0,
      topics: [
        {
          topic: "",
          observations: "",
        },
      ],
    },
  });

  const { toast } = useToast();

  function addNewInputs() {
    form.setValue("topics", [
      ...form.getValues("topics"),
      {
        topic: "",
        observations: "",
      },
    ]);
  }

  function deleteInput(index: number) {
    const topics = form.getValues("topics");
    if (topics.length > 1) {
      form.setValue(
        "topics",
        topics.filter((_, i) => i !== index)
      );
    }
  }

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    // this is where we send the form data to the db

    const formData = {
      ...values,
      start_time: values.start_time.toTimeString(),
      end_time: values.end_time.toTimeString(),
    };

    console.log(formData);
    try {
      // send the form data to the db
      toast({
        title: "Form submitted",
        description: "Your tutoring session has been successfully submitted!",
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
              <FormItem className="w-full lg:w-1/2">
                <FormLabel className="font-bold">TA Name</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="TA" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nathan Vazquez">
                        Nathan Vazquez
                      </SelectItem>
                      <SelectItem value="Ynalois Pangilinan">
                        Ynalois Pangilinan
                      </SelectItem>
                      <SelectItem value="Shohruz Ernazarov">
                        Shohruz Ernazarov
                      </SelectItem>
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

          <div className="flex flex-col lg:flex-row lg:justify-start justify-center items-center gap-2 lg:gap-4 xl:gap-8">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Shift Start Time</FormLabel>
                  <DatetimePicker
                    {...field}
                    format={[[], ["hours", "minutes", "am/pm"]]}
                  />
                  <FormDescription className="font-bold">
                    Select your start shift time.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Shift End Time</FormLabel>
                  <DatetimePicker
                    {...field}
                    format={[[], ["hours", "minutes", "am/pm"]]}
                  />
                  <FormDescription className="font-bold">
                    Select your end shift time.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name={"students"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">Students Tutored</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="How many students did you tutor?"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription className="font-bold">
                  Enter the amount of students you tutored
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h2 className="text-xl font-bold text-blue-400">
            Topics and Concerns:
          </h2>
          <div>
            <p className="text-sm font-semibold">
              Fill in a topic and the relevant concerns to that topic. You can
              add a new topic by clicking the "Add Topic" button. You can also
              delete a topic by clicking the "Delete" button.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {form.watch("topics").map((_, index) => (
            <div
              className={`${
                index >= 0 ? "pl-8 border-slate-200 border-l-[2px]" : "pl-0"
              }`}
              key={index}
            >
              <FormField
                control={form.control}
                name={`topics.${index}.topic`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">Topic</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={""}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="What topic was covered?"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Heaps">Heaps</SelectItem>
                          <SelectItem value="Hashing">Hashing</SelectItem>
                          <SelectItem value="Binary Search Trees">
                            Binary Search Trees
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="font-bold">
                      Choose the topic you covered
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`topics.${index}.observations`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">Observations</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-24"
                        placeholder="One student had trouble understanding the concept of..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-bold">
                      Write any observations, concerns, student struggles, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            Add Topic
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
