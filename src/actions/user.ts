"use server";

import prisma from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface CreateUserParams {
  firstName: string;
  lastName: string;
  emplid: string;
  email: string;
  clerkUserId: string;
}

export async function createUser({
  firstName,
  lastName,
  emplid,
  email,
  clerkUserId,
}: CreateUserParams) {
  console.log("Creating user with params:", {
    firstName,
    lastName,
    emplid,
    email,
    clerkUserId,
  });

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
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emplid,
        email,
        clerkUserId,
      },
    });

    return {
      user,
      message: res.publicMetadata,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
