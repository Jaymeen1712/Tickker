"use client";
import { Spinner } from "@/components";
import SingleOrderShowcaseComp from "./_single-order-showcase";
import useOrdersPageController from "./page-controller";

const OrdersPage = () => {
  const { orders, isLoading } = useOrdersPageController();

  return (
    <div className="container">
      <h3 className="mb-8 border-b border-b-gray-400 pb-8 text-center text-2xl font-semibold">
        Orders
      </h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-y-8">
          {orders.map((order) => (
            <SingleOrderShowcaseComp key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
