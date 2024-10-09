"use server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma_db";
import { SignupFormSchema } from "@/lib/definitions";
export async function signUp(username: string, password: string) {
  const result = SignupFormSchema.safeParse({ username, password });

  if (!result.success) {
    const errors = result.error.flatten();
    return {
      success: false,
      errors: errors.fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Username already taken",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
