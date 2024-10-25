"use server";
import { db } from "@/db";
import { FetchProfileByUserIdRequestObjType } from "@/types";
import { Profile } from "@prisma/client";

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

export const updateProfileById = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Profile>;
}) => {
  let response;
  let errors;

  try {
    const updatedProfile = await db.profile.update({
      where: {
        id,
      },
      data,
    });

    if (updatedProfile) {
      response = updatedProfile;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
