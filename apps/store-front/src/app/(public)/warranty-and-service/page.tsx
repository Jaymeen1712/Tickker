import { Header } from "@/components";

const WarrantyAndServicePage = () => {
  return (
    <div className="hero-image-gradient-container min-h-screen">
      <Header />

      <div className="container">
        <h3 className="pb-14 text-4xl font-normal uppercase tracking-tighter">
          Warranty & Service
        </h3>

        <div className="pb-16">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-lg">Standard Warranty</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="opacity-50">Coverage Period:</span>
                  <span className="pl-2">
                    12 months from the date of purchase.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">What’s Covered:</span>
                  <span className="pl-2">
                    Manufacturing defects in materials and workmanship under
                    normal use.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Exclusions:</span>
                  <span className="pl-2">
                    Damage from misuse, unauthorized repairs, and natural wear
                    and tear.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Proof of Purchase:</span>
                  <span className="pl-2">
                    A valid purchase receipt is required for warranty claims.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <h1 className="text-lg">Extended Warranty Options</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="opacity-50">Additional Coverage:</span>
                  <span className="pl-2">
                    Up to 3 years of extended coverage.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Cost:</span>
                  <span className="pl-2">
                    $30 for an additional year, $50 for two additional years.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">How to Enroll:</span>
                  <span className="pl-2">
                    Must be purchased within 30 days of the original purchase
                    date.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <h1 className="text-lg">Service & Repairs</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="opacity-50">
                    Authorized Service Centers:
                  </span>

                  <span className="pl-2">
                    Available nationwide at authorized service locations.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Repair Process:</span>
                  <span className="pl-2">
                    Contact support, ship to service center, approve estimate,
                    receive repair.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Estimated Repair Time:</span>
                  <span className="pl-2">
                    5-10 business days for standard repairs, up to 20 for
                    complex issues.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Replacement Policy:</span>
                  <span className="pl-2">
                    If repair is unfeasible, a replacement unit will be
                    provided.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <h1 className="text-lg">Support Channels</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="opacity-50">Phone Support:</span>
                  <span className="pl-2">
                    Available Monday–Friday, 9 AM–6 PM.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Live Chat:</span>
                  <span className="pl-2">24/7 support via our website.</span>
                </li>
                <li>
                  <span className="opacity-50">Email Support:</span>
                  <span className="pl-2">
                    Average response time is 24–48 hours.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <h1 className="text-lg">Return & Refund Policy</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="opacity-50">Eligibility:</span>
                  <span className="pl-2">
                    Returns accepted within 30 days if unused and in original
                    packaging.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Refund Process:</span>
                  <span className="pl-2">
                    Processed within 7–10 business days after product
                    inspection.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <h1 className="text-lg">Additional Protections</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="opacity-50">
                    Accidental Damage Protection:
                  </span>

                  <span className="pl-2">
                    Coverage for drops, spills, and accidental damage available
                    for purchase.
                  </span>
                </li>
                <li>
                  <span className="opacity-50">Onsite Repair:</span>
                  <span className="pl-2">
                    Available in select regions for specific products.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyAndServicePage;
