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
import useProductsListingTableCompController from "./comp-controller";

const ProductsListingTableComp = () => {
  const { isFetchAllProductsLoading, productsList, columns } =
    useProductsListingTableCompController();

  return (
    <>
      {isFetchAllProductsLoading ? (
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
            {productsList.map((product) => (
              <TableRow key={product.id}>
                {columns.map(
                  ({ key, bodyClassName, bodyOnClickHandler, customBody }) => (
                    <TableCell
                      className={bodyClassName}
                      {...(bodyOnClickHandler && {
                        onClick: () => bodyOnClickHandler(product.id),
                      })}
                      key={key}
                    >
                      {customBody
                        ? customBody(product[key], product.id)
                        : String(product[key])}
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

export default ProductsListingTableComp;
