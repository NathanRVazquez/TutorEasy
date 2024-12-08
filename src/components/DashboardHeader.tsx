"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignedIn, UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
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
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
