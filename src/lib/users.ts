import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function getUserById({
  userId,
  clerkUserId,
}: {
  userId?: string;
  clerkUserId?: string;
}) {
  try {
    if (!userId && !clerkUserId) {
      throw new Error("id or clerkUserId is required");
    }

    const query = userId ? { userId } : { clerkUserId };

    const user = await prisma.user.findUnique({ where: query });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(clerkUserId: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { clerkUserId },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(clerkUserId: string) {
  try {
    await prisma.user.delete({ where: { clerkUserId } });
    return { success: true };
  } catch (error) {
    return { error };
  }
}
