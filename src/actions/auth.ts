"use server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma_db";
import { SignupFormSchema } from "@/lib/definitions";
export async function signUp(username: string, password: string) {
  const result = SignupFormSchema.safeParse({ username, password });

  if (!result.success) {
    const errors = result.error.flatten();
    throw new Error(JSON.stringify(errors.fieldErrors));
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}
