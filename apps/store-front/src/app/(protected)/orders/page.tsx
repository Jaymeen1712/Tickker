"use client";
import { Header } from "@/components";
import Image from "next/image";
import SingleOrderShowcaseComp from "./_single-order-showcase";
import useOrdersPageController from "./page-controller";

const OrdersPage = () => {
  const { orders, isScrolled } = useOrdersPageController();

  return (
    <div className="hero-image-gradient-container min-h-screen">
      <div
        className={`sticky top-0 z-20 transition-all ${isScrolled ? "backdrop-blur-3xl" : ""}`}
      >
        <Header />
      </div>

      <div className="container flex flex-grow flex-col pb-16">
        <h3 className="pb-14 text-4xl font-normal uppercase tracking-tighter">
          Orders
        </h3>

        {orders && (
          <>
            {orders.length ? (
              <div className="flex flex-col gap-y-8">
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
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="text-lg font-semibold">No orders.</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
