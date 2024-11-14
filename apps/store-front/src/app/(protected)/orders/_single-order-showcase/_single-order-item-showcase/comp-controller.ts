import { useRouter } from "next/navigation";

interface SingleOrderItemShowcaseCompControllerProps {
  productId: string;
}

const useSingleOrderItemShowcaseCompController = ({
  productId,
}: SingleOrderItemShowcaseCompControllerProps) => {
  const router = useRouter();

  const handleRedirectToProductPage = () => {
    router.push(`/watches/${productId}`);
  };

  return { handleRedirectToProductPage };
};

export default useSingleOrderItemShowcaseCompController;
