"use client";

import { CustomButton, Header } from "@/components";
import usePaymentPageController from "./page-controller";

interface PaymentPageProps {
  params: {
    orderId: string;
  };
}

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const { handlePaymentButtonClick, isPaymentButtonLoading, total } =
    usePaymentPageController({
      orderId: params.orderId,
    });

  return (
    <div className="hero-image-gradient-container min-h-screen">
      <Header />
      <div className="container">
        <h3 className="pb-14 text-4xl font-normal uppercase tracking-tighter">
          Payments
        </h3>

        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-y-6 pb-14">
            <div className="flex items-center justify-between">
              <span className="opacity-50">Vat (18%)</span>
              <span>{total?.weightedTotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-50">Total excl. Vat</span>
              <span>{total?.excludeWeightedTotal}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Total incl. Vat</span>
              <span>{total?.includeWeightedTotal}</span>
            </div>
          </div>
          <CustomButton
            onClick={handlePaymentButtonClick}
            loading={isPaymentButtonLoading}
            className="bg-brown-2/100 uppercase hover:bg-brown-2/50"
          >
            Make payment
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
