"use server";
import { db } from "@/db";
import { FetchProfileByUserIdRequestObjType } from "@/types";

export const fetchProfileByUserId = async ({
  userId,
}: FetchProfileByUserIdRequestObjType) => {
  let response;
  let errors;

  try {
    const existingProfile = await db.profile.findFirst({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      response = existingProfile;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
