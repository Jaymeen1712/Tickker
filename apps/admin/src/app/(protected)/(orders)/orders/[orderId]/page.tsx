"use client";
import { CustomButton, CustomLabelValuePair, Spinner } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeWords } from "@/utils";
import { OrderItemStatus } from "@prisma/client";
import React from "react";
import useSingleOrderPageController from "./page-controller";

interface SingleOrderPageProps {
  params: {
    orderId: string;
  };
}

const SingleOrderPage: React.FC<SingleOrderPageProps> = ({ params }) => {
  const { orderId } = params;

  const {
    order,
    isFetchOrderLoading,
    handleOrderStatusChange,
    handleSubmit,
    isSaveButtonLoading,
  } = useSingleOrderPageController({
    orderId,
  });

  return (
    <div className="container">
      {isFetchOrderLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 rounded-md bg-gray-100 p-4">
            <CustomLabelValuePair label="ID" value={order?.id} />
            <CustomLabelValuePair label="Product ID" value={order?.productId} />
            <CustomLabelValuePair label="Quantity" value={order?.quantity} />
            <CustomLabelValuePair label="Price" value={order?.price} />
            <CustomLabelValuePair
              label="Total"
              value={
                order?.quantity &&
                order?.price &&
                order?.quantity * order?.price
              }
            />

            <div className="flex items-center gap-2">
              <div className="font-semibold">Status:</div>
              <Select
                value={order?.status}
                onValueChange={handleOrderStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OrderItemStatus).map((status) => (
                    <SelectItem value={status} key={status}>
                      {capitalizeWords(status.toLowerCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <CustomButton loading={isSaveButtonLoading} onClick={handleSubmit}>
              Save
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleOrderPage;
