"use client";

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
