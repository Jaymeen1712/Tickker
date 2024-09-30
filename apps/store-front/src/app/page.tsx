import { DashboardComp, Header } from "@/components";

export default function HomePage() {
  return (
    <div className="relative">
      <Header isSearchVisible={false} />
      <DashboardComp />
    </div>
  );
}
