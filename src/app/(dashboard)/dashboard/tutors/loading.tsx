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
    <Table className="">
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell className="text-end space-x-4">
              <Skeleton />
              <Skeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
