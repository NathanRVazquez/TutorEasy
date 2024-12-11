"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
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
import { Class } from "@prisma/client";
import { User } from "@prisma/client";

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
  class: z.string({
    required_error: "Class is required",
  }),
  class_section: z.string({
    required_error: "Class section is required",
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

// interface TutoringSessionFormProps {
//   classes: Class[];
// }

export default function TutoringSessionForm({
  tutors = [] as User[],
  classes = [] as Class[],
  class_section = [] as number[],
}) {
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

  async function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);

    try {
      const formData = {
        ...values,
        class_section: Number(values.class_section),
      };
      console.log("Form data 1:", formData);
      // calling the summary route to create the overall and specific summaries
      const response = await fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log("Response:", data);
      console.log("Form Data 2:", formData);

      // send the form data to the db
      const tutoringSessionData = {
        ...formData,
        ...data,
      };

      console.log("Tutoring Session Data:", tutoringSessionData);

      const dbResponse = await fetch("/api/tutoring-session", {
        method: "POST",
        body: JSON.stringify(tutoringSessionData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dbData = await dbResponse.json();
      console.log("DB Response:", dbData);

      if (!dbResponse.ok) {
        throw new Error(`HTTP error! status: ${dbResponse.status}`);
      }

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
                      {tutors.map((t) => {
                        const tutorName = `${t.firstName} ${t.lastName}`;
                        return (
                          <SelectItem key={t.userId} value={tutorName}>
                            {t.firstName} {t.lastName}
                          </SelectItem>
                        );
                      })}
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
            name="class"
            render={({ field }) => (
              <FormItem className="w-1/2 lg:w-1/2">
                <FormLabel className="font-bold">Class</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((c: Class) => (
                        <SelectItem key={c.classId} value={c.classId}>
                          {c.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="font-bold">
                  Select the class you tutored
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class_section"
            render={({ field }) => (
              <FormItem className="w-1/2 lg:w-1/2">
                <FormLabel className="font-bold">Class Section</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      {class_section.map((c) => (
                        <SelectItem key={c} value={c.toString()}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="font-bold">
                  Select the class you tutored
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
              add a new topic by clicking the &apos;Add Topic&apos; button. You
              can also delete a topic by clicking the &apos;Delete&apos; button.
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
