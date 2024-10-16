"use client";
import { Spinner } from "@/components";
import Image from "next/image";
import SingleOrderShowcaseComp from "./_single-order-showcase";
import useOrdersPageController from "./page-controller";

const OrdersPage = () => {
  const { orders, isLoading } = useOrdersPageController();

  return (
    <div className="container flex flex-grow flex-col">
      <div className="mb-8 flex flex-grow flex-col shadow-md">
        <h3 className="border border-black py-8 text-center text-2xl font-semibold text-black">
          Orders
        </h3>
        <div className="relative flex-grow border-2 border-t-0 border-dashed border-gray-3">
          <div className="absolute h-full w-full overflow-y-auto">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {orders.length ? (
                  <div className="flex flex-col">
                    {orders.map((order) => (
                      <SingleOrderShowcaseComp key={order.id} order={order} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className="relative h-[250px] w-[250px]">
                      <Image
                        src="/img-empty-cart.png"
                        alt="logo-maker"
                        fill
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="text-lg font-semibold">No orders.</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
