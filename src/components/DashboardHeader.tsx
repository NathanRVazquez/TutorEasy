"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          {/* <SidebarTrigger /> */}
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Data Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {session ? (
            <>
              <p>Welcome, {session.user?.name || "Welcome!"}</p>
            </>
          ) : (
            <p className="text-red-500">You are not logged in</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
