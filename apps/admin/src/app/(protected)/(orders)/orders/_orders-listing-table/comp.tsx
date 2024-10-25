"use client";
import { CustomHeaderWithTooltip, Spinner } from "@/components";
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
    <div className="box-shadow-container my-4 flex flex-1 flex-col">
      <CustomHeaderWithTooltip content="List of orders" header="Orders" />
      {isFetchAllOrdersLoading ? (
        <Spinner containerClassName="flex-1" />
      ) : (
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
    </div>
  );
};

export default OrdersListingTableComp;
