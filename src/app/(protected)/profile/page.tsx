"use client";

import { CustomAvatar, CustomLabelValuePair } from "@/components";
import useProfilePageController from "./page-controller";

const ProfilePage = () => {
  const { profile } = useProfilePageController();

  return (
    <div className="container">
      <div className="flex w-full flex-col items-center">
        <div className="relative h-[180px] w-fit rounded-full">
          <CustomAvatar />
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
