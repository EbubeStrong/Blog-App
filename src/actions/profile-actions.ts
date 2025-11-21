"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function updateProfile(profileFormData: FormData) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, message: "You must be logged in to update profile." };
    }

    const name = (profileFormData.get("name") as string) || "";
    const email = (profileFormData.get("email") as string) || "";

    if (!name.trim() || !email.trim()) {
      return { success: false, message: "Name and email are required." };
    }

    // Check if email is already used by another user
    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (existingUser && existingUser.id !== session.user.id) {
      return { success: false, message: "Email is already in use." };
    }

    await db.update(users).set({ name, email }).where(eq(users.id, session.user.id));

    // Revalidate profile page
    revalidatePath("/profile");

    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile. Try again." };
  }
}
