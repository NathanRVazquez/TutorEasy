import CreateClassForm from "@/components/CreateClassForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import prisma from "@/lib/db";

export default async function NewClassPage() {
  async function createClass(
    className: string,
    classSection: number,
    tutoringGuidelines: string
  ) {
    "use server";
    //  Class_Name String
    // Class_Section Int
    // Tutoring_Guideline String
    if (
      className == null ||
      className == "" ||
      classSection == null ||
      classSection <= 0
    ) {
      throw new Error(
        "className or classSection either null, empty or classSection <=0"
      );
    } else if (tutoringGuidelines == null) {
      tutoringGuidelines = "";
    }

    const new_class = await prisma.$queryRaw`
  INSERT INTO Class ('className', 'classSection', 'tutoringGuidelines')
  VALUES (${className}, ${classSection}, ${tutoringGuidelines});
  `;

    if (new_class == null) {
      throw new Error("New class was not created due to an unexpected error");
    }
  }

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <h1 className="text-3xl">Create New Class</h1>
      <Link href="/dashboard/classes">
        <Button>Back to Classes</Button>
      </Link>
      <CreateClassForm createClass={createClass} />
    </div>
  );
}
