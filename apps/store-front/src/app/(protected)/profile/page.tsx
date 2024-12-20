"use client";

import {
  CustomButton,
  CustomInputAvatar,
  CustomLabelValuePair,
  Header,
} from "@/components";
import { signOut } from "next-auth/react";
import useProfilePageController from "./page-controller";

const ProfilePage = () => {
  const {
    profile,
    handleImageOnChange,
    isProfileLoading,
    handleDeleteImage,
    isScrolled,
  } = useProfilePageController();

  return (
    <div className="hero-image-gradient-container min-h-screen">
      <div
        className={`sticky top-0 z-20 transition-all ${isScrolled ? "backdrop-blur-3xl" : ""}`}
      >
        <Header />
      </div>
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

          <CustomButton
            className="mt-8 bg-brown-2/100 uppercase hover:bg-brown-2/50"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Logout
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
