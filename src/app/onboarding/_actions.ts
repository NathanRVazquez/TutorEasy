"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const completeOnboarding = async (formData: FormData) => {
  console.log(formData);
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
