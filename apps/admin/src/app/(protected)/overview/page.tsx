import CustomerGraph from "./_graphs/customer-graph/customer-graph";

const OverviewPage = () => {
  return (
    <div className="container">
      <div className="h-96 w-full">
        <CustomerGraph />
      </div>
    </div>
  );
};

export default OverviewPage;
