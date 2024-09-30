"use client";
import { fetchProfileByUserId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

const useProfile = () => {
  const { setProfile } = useAppStore();
  const { data: session } = useSession();

  const handleGetProfile = useCallback(async () => {
    try {
      if (!session?.user?.id) {
        return;
      }

      const { errors, response } = await fetchProfileByUserId({
        userId: session?.user?.id,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setProfile(result);
      }
    } finally {
    }
  }, [session, setProfile]);

  useEffect(() => {
    handleGetProfile();
  }, [handleGetProfile]);

  return null;
};

export default useProfile;
