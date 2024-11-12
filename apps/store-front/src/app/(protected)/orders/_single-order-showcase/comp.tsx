"use client";
import { CustomLabelValuePair } from "@/components";
import { OrderIncludingOrderItemsIncludingProductType } from "@/types";
import { capitalizeFirstLetter } from "@/utils";
import SingleOrderItemShowcaseComp from "./_single-order-item-showcase";

interface SingleOrderShowcaseCompProps {
  order: OrderIncludingOrderItemsIncludingProductType;
}

const SingleOrderShowcaseComp: React.FC<SingleOrderShowcaseCompProps> = ({
  order,
}) => {
  const { amount, id, orderItems, paymentStatus } = order;

  return (
    <div className="rounded-3xl bg-white/10 p-8 shadow-md">
      <div className="flex flex-col">
        <CustomLabelValuePair
          label="OrderId"
          value={id}
          labelClassName="w-[220px]"
          isDashVisible={false}
        />
        <CustomLabelValuePair
          label="SubTotal"
          value={amount}
          labelClassName="w-[220px]"
          isDashVisible={false}
        />
        <CustomLabelValuePair
          label="Payment status"
          value={capitalizeFirstLetter(paymentStatus.toLowerCase())}
          labelClassName="w-[220px]"
          isDashVisible={false}
        />
        <CustomLabelValuePair
          label="Products"
          value={""}
          labelClassName="w-[220px]"
          isDashVisible={false}
        />
      </div>

      <div className="hide-scrollbar flex gap-x-8 overflow-x-auto pt-8">
        {orderItems.map((orderItem) => (
          <SingleOrderItemShowcaseComp
            key={orderItem.id}
            orderItem={orderItem}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleOrderShowcaseComp;
