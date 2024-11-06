import { Header } from "@/components";
import {
  DashboardHeroImageContainer,
  RemainingDashboardContainer,
} from "@/components/dashboard";

export default function HomePage() {
  return (
    <div className="relative">
      <div className="hero-image-gradient-container">
        <Header />
        <DashboardHeroImageContainer />
      </div>
      <div className="remaining-dashboard-gradient-container">
        <RemainingDashboardContainer />
      </div>
    </div>
  );
}
