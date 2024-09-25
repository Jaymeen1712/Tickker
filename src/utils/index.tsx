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
