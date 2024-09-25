"use client";

import { CustomButton, Spinner } from "@/components";
import usePaymentPageController from "./page-controller";

interface PaymentPageProps {
  params: {
    orderId: string;
  };
}

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const {
    order,
    isOrderLoading,
    handlePaymentButtonClick,
    isPaymentButtonLoading,
  } = usePaymentPageController({
    orderId: params.orderId,
  });

  return (
    <div className="container">
      {isOrderLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-center">
          <span>Amount: {order?.amount}</span>
          <CustomButton
            onClick={handlePaymentButtonClick}
            loading={isPaymentButtonLoading}
          >
            Make payment
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
