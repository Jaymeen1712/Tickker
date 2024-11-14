import { CartItemsIncludingProductType } from "@/types";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import useCartShowcaseProductCompController from "./comp-controller";

interface CartShowcaseSingleProductCompProps {
  cartItem: CartItemsIncludingProductType;
  handleGetCartItems: () => void;
}

const CartShowcaseSingleProductComp: React.FC<
  CartShowcaseSingleProductCompProps
> = ({ cartItem, handleGetCartItems }) => {
  const { handleRemoveCartItem, handleRedirectToProductPage } =
    useCartShowcaseProductCompController({
      cartItem,
      handleGetCartItems,
    });

  const { product } = cartItem;
  const { category, images, price, model, strap, buckle, strapSize, stock } =
    product;

  return (
    <div className="flex flex-col">
      <div
        className="single-product-card-gradient-container relative flex h-96 w-96 cursor-pointer flex-col justify-between rounded-3xl p-6"
        onClick={handleRedirectToProductPage}
      >
        <div className="z-10 flex items-center justify-between">
          <span className="w-fit rounded-3xl bg-white/5 px-4 py-2 text-sm backdrop-blur-3xl">
            Limited to {stock} pieces
          </span>

          <IoCloseOutline
            className="cursor-pointer text-2xl opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveCartItem();
            }}
          />
        </div>

        <div className="z-10 flex flex-col gap-y-2 pb-4 pl-4 uppercase">
          <span className="text-xs opacity-50">{model}</span>
          <span className="text-sm">{category}</span>
        </div>

        {/* Image container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[240px] w-[240px]">
            <Image
              src={images[0]}
              alt="logo-maker"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="single-cart-product-card-remaining-container-gradient -mt-10 flex w-96 flex-col gap-y-8 rounded-3xl border-transparent px-10 pb-6 pt-16 uppercase">
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="opacity-50">Strap</h1>
            <span>{strap}</span>
          </div>

          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="opacity-50">Buckle</h1>
            <span>{buckle}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-y-2 text-sm">
            <h1 className="opacity-50">Strap size</h1>
            <span>{strapSize}</span>
          </div>
          <div />
        </div>

        <div className="text-xl font-bold opacity-50">{price} ₹</div>
      </div>
    </div>
  );
};

export default CartShowcaseSingleProductComp;
