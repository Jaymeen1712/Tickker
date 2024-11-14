import { Header } from "@/components";
import {
  DashboardHeroImageContainer,
  RemainingDashboardContainer,
} from "@/components/dashboard";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="hero-image-gradient-container">
        <Header />
        <DashboardHeroImageContainer />
      </div>
      <div className="remaining-dashboard-gradient-container flex-1">
        <RemainingDashboardContainer />
      </div>
    </div>
  );
}
