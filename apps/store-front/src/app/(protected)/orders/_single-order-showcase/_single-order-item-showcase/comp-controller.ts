import { useRouter } from "next/navigation";

interface SingleOrderItemShowcaseCompControllerProps {
  productId: string;
}

const useSingleOrderItemShowcaseCompController = ({
  productId,
}: SingleOrderItemShowcaseCompControllerProps) => {
  const router = useRouter();

  const handleRedirectToIndividualProductPage = () => {
    router.push(`/products/${productId}`);
  };

  return { handleRedirectToIndividualProductPage };
};

export default useSingleOrderItemShowcaseCompController;
