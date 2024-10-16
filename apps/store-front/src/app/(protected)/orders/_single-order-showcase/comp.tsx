"use client";
import { CustomLabelValuePair } from "@/components";
import { OrderIncludingOrderItemsIncludingProductType } from "@/types";
import { capitalizeFirstLetter } from "@/utils";
import SingleOrderItemShowcaseComp from "./_single-order-item-showcase";
import useSingleOrderShowcaseCompController from "./comp-controller";

interface SingleOrderShowcaseCompProps {
  order: OrderIncludingOrderItemsIncludingProductType;
}

const SingleOrderShowcaseComp: React.FC<SingleOrderShowcaseCompProps> = ({
  order,
}) => {
  useSingleOrderShowcaseCompController();

  const { amount, id, orderItems, paymentStatus } = order;

  return (
    <div className="border-b border-b-black px-8 py-4 transition-all last:border-none hover:bg-white">
      <div className="flex flex-col">
        <CustomLabelValuePair label="OrderId" value={id} />
        <CustomLabelValuePair label="SubTotal" value={amount} />
        <CustomLabelValuePair
          label="Payment status"
          value={capitalizeFirstLetter(paymentStatus.toLowerCase())}
        />{" "}
        <CustomLabelValuePair label="Products" value={""} />
      </div>

      {orderItems.map((orderItem) => (
        <SingleOrderItemShowcaseComp key={orderItem.id} orderItem={orderItem} />
      ))}
    </div>
  );
};

export default SingleOrderShowcaseComp;
