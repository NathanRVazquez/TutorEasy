import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-1/3"></Skeleton>
        ))}
      </div>
    </div>
  );
}
