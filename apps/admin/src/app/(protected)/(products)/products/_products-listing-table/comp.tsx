import { CustomButton, CustomHeaderWithTooltip, Spinner } from "@/components";
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
  const { isFetchAllProductsLoading, productsList, columns, router } =
    useProductsListingTableCompController();

  return (
    <div className="box-shadow-container my-4 flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <CustomHeaderWithTooltip
          content="List of products"
          header="Products"
          mainContainerClassName="mb-0"
        />
        <CustomButton onClick={() => router.push("/add-update-product")}>
          Add Product
        </CustomButton>
      </div>
      {isFetchAllProductsLoading ? (
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
    </div>
  );
};

export default ProductsListingTableComp;
