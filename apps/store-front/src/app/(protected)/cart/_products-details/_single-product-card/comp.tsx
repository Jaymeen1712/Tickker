import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartItemsIncludingProductType } from "@/types";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

interface CartShowcaseSingleProductCompProps {
  cartItem: CartItemsIncludingProductType;
  handleGetCartItems: () => void;
}

const CartShowcaseSingleProductComp: React.FC<
  CartShowcaseSingleProductCompProps
> = ({ cartItem, handleGetCartItems }) => {
  // const {
  //   handleProductQuantityChange,
  //   isProdQuantityLoading,
  //   handleRedirectToIndividualProductPage,
  //   isRemoveCartItemLoading,
  //   handleRemoveCartItem,
  //   handleRedirectToProductPage,
  // } = useCartShowcaseProductCompController({
  //   cartItem,
  //   handleGetCartItems,
  // });

  // const { product, quantity } = cartItem;
  // const { brand, category, description, images, name, price } = product;

  return (
    <div className="flex flex-col">
      <div
        className="single-product-card-gradient-container relative flex h-96 w-96 flex-col justify-between rounded-3xl p-6"
        // onClick={handleRedirectToProductPage}
      >
        <div className="z-10 flex items-center justify-between">
          <span className="w-fit rounded-3xl bg-white/5 px-4 py-2 text-sm backdrop-blur-3xl">
            Limited to 60 pieces
          </span>

          <IoCloseOutline className="cursor-pointer text-2xl opacity-50" />
        </div>

        <div className="z-10 flex flex-col gap-y-2 pb-4 pl-4 uppercase">
          <span className="text-xs opacity-50">CH-9356M.2-GREEK</span>
          <span className="text-sm">Space timer black hole</span>
        </div>

        {/* Image container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply">
          <div className="h-[240px] w-[240px]">
            <Image
              src={`/watches/28000253_s.jpg`}
              alt="logo-maker"
              fill
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <div className="single-cart-product-card-remaining-container-gradient -mt-10 flex w-96 flex-col gap-y-8 rounded-3xl border-transparent px-10 pb-6 pt-16 uppercase">
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="opacity-50">Strap</h1>
            <span>Louisiana leather</span>
          </div>

          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="opacity-50">Buckle</h1>
            <span>Folding clasp</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="opacity-50">Strap size</h1>
            <Select>
              <SelectTrigger className="rounded-3xl border-none bg-white/10 backdrop-blur-3xl">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div />
        </div>

        <div className="font-semibold text-[#705b4c8c]">14,200 ₹</div>
      </div>
    </div>
  );
};

export default CartShowcaseSingleProductComp;
