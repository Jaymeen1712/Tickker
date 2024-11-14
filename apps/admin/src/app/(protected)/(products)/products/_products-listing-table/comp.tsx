import { CustomButton, CustomHeaderWithTooltip, Spinner } from "@/components";
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
              {productsList.length ? (
                <>
                  {productsList.map((product) => (
                    <TableRow key={product.id}>
                      {columns.map(
                        ({
                          key,
                          bodyClassName,
                          bodyOnClickHandler,
                          customBody,
                        }) => (
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
                </>
              ) : null}
            </TableBody>
          </Table>
          {!productsList.length ? (
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

export default ProductsListingTableComp;
