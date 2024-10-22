"use client";

import { ERRORS } from "@/enum";
import { toast } from "sonner";

export * from "./enum";

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

export const handleShowWarning = (warningMessage: string) => {
  toast.warning(warningMessage);
};

export function capitalizeWords(input: string | undefined) {
  if (!input) return "";

  const words = input.replace(/_/g, " ").split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  if (capitalizedWords.length > 1) {
    capitalizedWords[1] =
      capitalizedWords[1].charAt(0).toUpperCase() +
      capitalizedWords[1].slice(1);
  }

  return capitalizedWords.join(" ");
}

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

export function convertBase64ToFile(base64: string, filename: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
