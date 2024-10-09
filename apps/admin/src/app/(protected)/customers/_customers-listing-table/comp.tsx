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
import useCustomersListingTableCompController from "./comp-controller";

const CustomersListingTableComp = () => {
  const { customers, isFetchCustomersLoading, columns } =
    useCustomersListingTableCompController();

  return (
    <>
      {isFetchCustomersLoading ? (
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
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                {columns.map(
                  ({ key, bodyClassName, bodyOnClickHandler, customBody }) => (
                    <TableCell
                      className={bodyClassName}
                      {...(bodyOnClickHandler && {
                        onClick: () => bodyOnClickHandler(customer.id),
                      })}
                      key={key}
                    >
                      {customBody
                        ? customBody(customer[key], customer.id)
                        : String(customer[key])}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CustomersListingTableComp;
