"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserPen, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User } from "@prisma/client";
import { motion } from "framer-motion";

interface TutorsProps {
  tutors: User[];
}

export default function Tutors({ tutors }: TutorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table className="border-x-2">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">First Name</TableHead>
            <TableHead className="font-bold">Last Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">EMPLID</TableHead>
            <TableHead className="font-bold text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tutors.map((tutor) => (
            <TableRow key={tutor.userId}>
              <TableCell>{tutor.firstName}</TableCell>
              <TableCell>{tutor.lastName}</TableCell>
              <TableCell>{tutor.email}</TableCell>
              <TableCell>{tutor.emplid}</TableCell>
              <TableCell className="text-end space-x-4">
                <Button variant="secondary">
                  <UserPen size={24} />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="secondary">
                      <UserRoundX size={24} />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
