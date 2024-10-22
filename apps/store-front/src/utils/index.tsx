"use client";

import { Button } from "@/components/ui/button";
import { ERRORS } from "@/enum";
import { toast } from "sonner";

export const handleAPIResponse = (errors: any, response: any) => {
  if (!errors) {
    return response;
  }

  if (typeof errors === "object") {
    toast.error(errors.join(", "));
  }

  console.error(errors);
};

export const handleShowError = (errorIndex: number, customError?: string) => {
  toast.error(
    customError ?? ERRORS[`ERROR_${errorIndex}` as keyof typeof ERRORS],
  );
};

export const handleShowSuccess = (successMessage: string) => {
  toast.success(successMessage);
};

export const handleNoProfileInPublicTemplate = () => {
  toast.error("Login or register in order to perform this action", {
    action: (
      <Button
        onClick={() => (window.location.href = "/login")}
        className="ml-4"
      >
        Redirect to login
      </Button>
    ),
  });
};

export const capitalizeFirstLetter = (
  str: string | undefined | null,
): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      // Check if the result is a string (Base64)
      if (typeof reader.result === "string") {
        resolve(reader.result); // Only resolve if it's a string
      } else {
        reject(new Error("File could not be converted to a Base64 string"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file); // Convert file to base64 string
  });
};
