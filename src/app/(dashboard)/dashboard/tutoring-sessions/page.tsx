"use server";

import React from "react";
import TutoringSessionForm from "@/components/TutoringSessionForm";
import prisma from "@/lib/db";

const TutoringSessionsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params; // Assuming you pass the tutor's UID as a parameter

  console.log("id", id);
  // Fetch classes assigned to the specific tutor

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <TutoringSessionForm />
    </div>
  );
};

export default TutoringSessionsPage;
