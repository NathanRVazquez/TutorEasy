import React from "react";
import NewTutorForm from "@/components/NewTutorForm";
import prisma from "@/lib/db";

const NewTutorPage = () => {
  async function createTutor(userId: string) {
    if (userId == null || userId == "") {
      throw new Error("userId null");
    }

    const new_class = await prisma.$queryRaw`
    UPDATE users
    SET "userType" = 'TA'
    WHERE "userId"= ${userId}
    `;

    if (new_class == null) {
      throw new Error("New tutor was not created due to an unexpected error");
    }
  }

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <NewTutorForm />
    </div>
  );
};

export default NewTutorPage;
