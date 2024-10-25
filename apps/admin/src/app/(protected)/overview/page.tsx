import { CustomersGraph, RevenueGraph, SalesGraph } from "./_graphs";

const OverviewPage = () => {
  return (
    <div className="container py-4">
      <SalesGraph />
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <CustomersGraph />
        </div>
        <div className="col-span-1">
          <RevenueGraph />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
