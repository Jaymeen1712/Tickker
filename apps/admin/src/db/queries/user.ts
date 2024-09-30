"use server";

import { db } from "@/db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
};

// export const getUserByUsername = async (username: string) => {
//   try {
//     const user = await db.user.findFirst({
//       where: {
//         username,
//       },
//     });

//     return user;
//   } catch (error) {
//     return null;
//   }
// };

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};

// export const updateUser = async (
//   id: string,
//   user: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
// ) => {
//   try {
//     const updatedUser = await db.user.update({
//       where: {
//         id,
//       },
//       data: {
//         ...user,
//       },
//     });

//     if (updatedUser) {
//       return updatedUser;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
