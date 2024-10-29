'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";


const DashboardHeader = () => {
  const { data: session, status } = useSession();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Data Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semester</SelectItem>
              <SelectItem value="2">Month</SelectItem>
              <SelectItem value="3">Week</SelectItem>
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
            )
        }
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
