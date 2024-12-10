"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tutor } from "@prisma/client";

export const columns: ColumnDef<Tutor>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "",
    header: "",
  },
];
