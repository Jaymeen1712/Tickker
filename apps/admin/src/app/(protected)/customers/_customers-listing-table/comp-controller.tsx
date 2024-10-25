"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchCustomersByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse, handleGetInitials } from "@/utils";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useCustomersListingTableCompController = () => {
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [isFetchCustomersLoading, setIsFetchCustomersLoading] = useState(true);

  const { profile } = useAppStore();

  const router = useRouter();

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
      key: "email",
    },
    {
      key: "highResImage",
      label: "",
      customBody: (value, id) => {
        const initials = handleGetInitials(
          customers.find((customer) => customer.id === id)?.name,
        );

        return (
          <Avatar className="h-8 w-8">
            <AvatarImage src={value as string} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        );
      },
    },
  ];

  useEffect(() => {
    handleGetAllCustomers();
  }, [handleGetAllCustomers]);

  return { customers, isFetchCustomersLoading, columns };
};

export default useCustomersListingTableCompController;
