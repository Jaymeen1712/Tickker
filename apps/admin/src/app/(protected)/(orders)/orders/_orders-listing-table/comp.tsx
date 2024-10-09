"use client";
import { Spinner } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeWords } from "@/utils";
import useOrdersListingTableCompController from "./comp-controller";

const OrdersListingTableComp = () => {
  const { isFetchAllOrdersLoading, ordersList, columns } =
    useOrdersListingTableCompController();

  return (
    <>
      {isFetchAllOrdersLoading ? (
        <Spinner />
      ) : (
        <Table className="my-8 bg-white">
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
            {ordersList.map((product) => (
              <TableRow key={product.id}>
                {columns.map(({ key, bodyClassName, bodyOnClickHandler }) => (
                  <TableCell
                    className={bodyClassName}
                    {...(bodyOnClickHandler && {
                      onClick: () => bodyOnClickHandler(product.id),
                    })}
                    key={key}
                  >
                    {String(product[key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default OrdersListingTableComp;
