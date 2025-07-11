"use server";

import { fetchUserByEmail, fetchUserById } from "@repo/shared-database";

export const getUserById = async (id: string) => {
  const result = await fetchUserById(id, true);
  return result.data || null;
};

export const getUserByEmail = async (email: string) => {
  const result = await fetchUserByEmail(email, true);
  return result.data || null;
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
