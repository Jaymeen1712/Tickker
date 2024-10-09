"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchCustomersByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { Profile } from "@prisma/client";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";

const useCustomersListingTableCompController = () => {
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [isFetchCustomersLoading, setIsFetchCustomersLoading] = useState(true);

  const { profile } = useAppStore();

  const handleGetAllCustomers = useCallback(async () => {
    if (!profile) {
      return;
    }

    try {
      const { id: profileId } = profile;

      setIsFetchCustomersLoading(true);
      const { response, errors } = await fetchCustomersByProfileId(profileId);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setCustomers(result);
      }
    } finally {
      setIsFetchCustomersLoading(false);
    }
  }, [profile]);

  const columns: {
    key: keyof Profile;
    label?: string;
    className?: string;
    bodyClassName?: string;
    bodyOnClickHandler?: (id: string) => void;
    customBody?: (
      value: string | React.ReactNode | number | boolean | Date,
      id: string,
    ) => React.ReactNode;
  }[] = [
    {
      key: "id",
      label: "Customer ID",
      bodyClassName: "font-semibold cursor-pointer",
      bodyOnClickHandler: (id: string) => router.push(`/customers/${id}`),
    },
    {
      key: "name",
    },
    {
      key: "highResImage",
      label: "",
      customBody: () => (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "email",
    },
  ];

  useEffect(() => {
    handleGetAllCustomers();
  }, [handleGetAllCustomers]);

  return { customers, isFetchCustomersLoading, columns };
};

export default useCustomersListingTableCompController;
