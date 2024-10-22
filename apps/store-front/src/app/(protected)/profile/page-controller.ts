"use client";

import { InputProps } from "@/components/ui/input";
import { fetchProfileByUserId, updateProfileById } from "@/db/queries";
import { convertFileToBase64, handleAPIResponse } from "@/utils";
import { Profile } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useProfilePageController = () => {
  const [profile, setProfile] = useState<Profile>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const { data: session } = useSession();

  const handleGetProfile = useCallback(async () => {
    if (!session?.user?.id) {
      return;
    }

    try {
      setIsProfileLoading(true);

      const { errors, response } = await fetchProfileByUserId({
        userId: session?.user?.id,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setProfile(result);
      }
    } finally {
      setIsProfileLoading(false);
    }
  }, [session, setProfile]);

  const handleImageOnChange: InputProps["onChange"] = async (e) => {
    if (!profile) {
      return;
    }

    const files = e.target.files;

    if (files) {
      const file = files[0];
      const base64File = await convertFileToBase64(file);
      try {
        const { errors, response } = await updateProfileById({
          data: {
            highResImage: base64File,
          },
          id: profile.id,
        });

        const result = handleAPIResponse(errors, response);

        if (result) {
          handleGetProfile();
        }
      } finally {
      }
    }
  };

  const handleDeleteImage = async () => {
    if (!profile) {
      return;
    }

    try {
      const { errors, response } = await updateProfileById({
        id: profile.id,
        data: {
          highResImage: "",
        },
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        handleGetProfile();
      }
    } finally {
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, [handleGetProfile]);

  return { profile, handleImageOnChange, isProfileLoading, handleDeleteImage };
};

export default useProfilePageController;
