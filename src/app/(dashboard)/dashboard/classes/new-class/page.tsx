import CreateClassForm from "@/components/CreateClassForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewClassPage() {
  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <h1 className="text-3xl">Create New Class</h1>
      <CreateClassForm />

      <Link href="/dashboard/classes">
        <Button>Back to Classes</Button>
      </Link>
    </div>
  );
}
