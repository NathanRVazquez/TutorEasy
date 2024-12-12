import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl space-y-4">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
}
