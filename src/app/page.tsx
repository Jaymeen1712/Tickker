import { DashboardComp, Header } from "@/components";

export default function HomePage() {
  return (
    <div className="relative h-[5000px]">
      <Header isSearchVisible={false} />
      <DashboardComp />
    </div>
  );
}
