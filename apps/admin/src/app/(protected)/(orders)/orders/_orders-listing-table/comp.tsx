"use client";
import { CustomHeaderWithTooltip, Spinner } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeWords } from "@/utils";
import Image from "next/image";
import useOrdersListingTableCompController from "./comp-controller";

const OrdersListingTableComp = () => {
  const { isFetchAllOrdersLoading, ordersList, columns } =
    useOrdersListingTableCompController();

  return (
    <div className="box-shadow-container my-4 flex flex-1 flex-col">
      <CustomHeaderWithTooltip content="List of orders" header="Orders" />
      {isFetchAllOrdersLoading ? (
        <Spinner containerClassName="flex-1" />
      ) : (
        <>
          <Table className="mt-2 bg-white">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                {columns.map(({ key, className, label }) => (
                  <TableHead className={className} key={key}>
                    {label ?? capitalizeWords(key)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersList.length ? (
                <>
                  {ordersList.map((product) => (
                    <TableRow key={product.id}>
                      {columns.map(
                        ({ key, bodyClassName, bodyOnClickHandler }) => (
                          <TableCell
                            className={bodyClassName}
                            {...(bodyOnClickHandler && {
                              onClick: () => bodyOnClickHandler(product.id),
                            })}
                            key={key}
                          >
                            {String(product[key])}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  ))}
                </>
              ) : null}
            </TableBody>
          </Table>

          {!ordersList.length ? (
            <TableCaption className="mt-0 flex w-full flex-1 items-center justify-center rounded-b-2xl bg-white py-8 text-base">
              <div className="flex flex-col gap-y-4">
                <div className="relative h-40 w-40">
                  <Image
                    src="/img-no-product-found.png"
                    alt="logo-maker"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                <span>No results found</span>
              </div>
            </TableCaption>
          ) : null}
        </>
      )}
    </div>
  );
};

export default OrdersListingTableComp;
