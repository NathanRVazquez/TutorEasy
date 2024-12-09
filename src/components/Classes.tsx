"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Class } from "@prisma/client";

interface ClassesProps {
  classes: Class[];
}

export default function Classes({ classes }: ClassesProps) {
  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : ( */}
            <Accordion type="single" collapsible className="w-full">
              {classes.map((cls: Class) => (
                <AccordionItem key={cls.classId} value={cls.classId}>
                  <AccordionTrigger className="text-left">
                    <div>
                      <h3 className="text-lg font-semibold">{cls.className}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cls.classSection}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {/*<div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Students</p>
                            <p className="text-2xl font-bold">{cls.students}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Average Grade</p>
                            <p className="text-2xl font-bold">{cls.averageGrade}%</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Next Assignment</p>
                          <p className="text-lg">{cls.nextAssignment}</p>
                        </div> */}
                      <div>
                        <p className="text-sm font-medium">
                          Tutoring Guidelines
                        </p>
                        <p className="text-sm">{cls.tutoringGuidelines}</p>
                      </div>
                      <Button asChild>
                        <Link href={`/dashboard/classes/${cls.classId}`}>
                          View Class Details
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {/* )} */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
