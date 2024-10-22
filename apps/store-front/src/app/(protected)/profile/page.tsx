"use client";

import { CustomInputAvatar, CustomLabelValuePair } from "@/components";
import useProfilePageController from "./page-controller";

const ProfilePage = () => {
  const { profile, handleImageOnChange, isProfileLoading, handleDeleteImage } =
    useProfilePageController();

  return (
    <div className="container">
      <div className="flex w-full flex-col items-center">
        <CustomInputAvatar
          imgSrc={profile?.highResImage}
          onImageChange={handleImageOnChange}
          name={profile?.name}
          isLoading={isProfileLoading}
          onImageDelete={handleDeleteImage}
        />
        <div className="mt-8">
          <CustomLabelValuePair label="Name" value={profile?.name} />
          <CustomLabelValuePair label="Email" value={profile?.email} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
