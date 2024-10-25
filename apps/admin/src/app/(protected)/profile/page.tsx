"use client";
import { CustomLabelValuePair } from "@/components";
import { useMemo } from "react";
import useProfilePageController from "./page-controller";

const ProfilePage = () => {
  const { profile } = useProfilePageController();

  const initials = useMemo(() => {
    if (!profile?.name) return "";
    const [firstName = "", lastName = ""] = profile.name.split(" ");
    return `${firstName[0]?.toUpperCase() || ""}${lastName[0]?.toUpperCase() || ""}`;
  }, [profile]);

  return (
    <div className="container my-8">
      <div className="flex w-full flex-col items-center">
        <div className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full border-2 border-gray-300 bg-white text-5xl font-bold text-gray-700">
          {initials && <span>{initials}</span>}
        </div>

        <div className="mt-8">
          <CustomLabelValuePair label="Name" value={profile?.name} />
          <CustomLabelValuePair label="Email" value={profile?.email} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
