import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashboardHeader = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
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
          <p>User</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
