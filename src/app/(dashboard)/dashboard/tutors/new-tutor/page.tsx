import React from "react";
import NewTutorForm from "@/components/NewTutorForm";
import prisma from "@/lib/db";

const NewTutorPage = () => {




  async function createTutor(User_ID:string) {
    //  Class_Name String
    // Class_Section Int
    // Tutoring_Guideline String
    if(User_ID == null || User_ID == ''){
      throw new Error('User_ID null');
    }
  
    const new_class = await prisma.$queryRaw`
    UPDATE users
    SET "User_Type" = 'TA'
    WHERE "User_ID"= ${User_ID}
    `;
  
    if(new_class == null){
      throw new Error('New tutor was not created due to an unexpected error');
    }
    
  }






  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <NewTutorForm />
    </div>
  );
};

export default NewTutorPage;
