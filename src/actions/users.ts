"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { headleError } from "@/lib/utils";

export const LoginUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return headleError(error);
  }
};
export const LayOutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return headleError(error);
  }
};

export const SignUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });
    if (error) throw error;
    const userId = data.user?.id;
      if (!userId) throw new Error("Error creating user");
      // 创建用户
      await prisma.user.create({
          data: {
              id: userId,
              email,
          }
      })


    return { errorMessage: null };
  } catch (error) {
    console.log(error,123123)
    return headleError(error);
  }
};
