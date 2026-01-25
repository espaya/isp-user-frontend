import { useState } from "react";

export default function MyPackage() {
  const [currentPackage, setCurrentPackage] = useState({
    name: "Daily 10gh",
    speed: "10 Mbps",
    devices: 1,
    expires: "Today 11:59 PM",
    price: "10gh",
  });

  const packages = [
    { name: "Daily 10gh", speed: "10 Mbps", price: "10gh", devices: 1 },
    { name: "Daily 15gh", speed: "15 Mbps", price: "15gh", devices: 1 },
    { name: "Weekly 60gh", speed: "20 Mbps", price: "60gh", devices: 2 },
    { name: "Weekly 80gh", speed: "25 Mbps", price: "80gh", devices: 2 },
    { name: "Monthly 130gh", speed: "30 Mbps", price: "130gh", devices: 3 },
    { name: "Monthly 150gh", speed: "35 Mbps", price: "150gh", devices: 3 },
    {
      name: "Special Offer 200gh",
      speed: "50 Mbps",
      price: "200gh",
      devices: 5,
    },
  ];

  const colors = [
    "bg-info text-white",
    "bg-success text-white",
    "bg-warning text-dark",
    "bg-danger text-white",
    "bg-primary text-white",
    "bg-secondary text-white",
    "bg-dark text-white",
  ];

  const handleSubscribe = (pkg) => {
    setCurrentPackage({
      ...pkg,
      expires: pkg.name.includes("Daily")
        ? "Today 11:59 PM"
        : pkg.name.includes("Weekly")
          ? "This Week"
          : pkg.name.includes("Monthly")
            ? "This Month"
            : "Unlimited",
    });
    alert(`You have subscribed to ${pkg.name}`);
  };

  const handleCancel = () => {
    alert(`You have canceled ${currentPackage.name}`);
    setCurrentPackage({}); // clear the current package
  };

  const getUpgradeDowngradeLabel = (pkg) => {
    const currentPrice = parseInt(currentPackage.price);
    const pkgPrice = parseInt(pkg.price);
    if (pkgPrice > currentPrice) return "Upgrade";
    if (pkgPrice < currentPrice) return "Downgrade";
    return "Current Plan";
  };

  return (
    <div>
      {/* CURRENT PACKAGE */}
      {currentPackage.name && (
        <div className="order-box mb-4">
          <h4>
            <i className="fas fa-box text-info" /> Current Package
          </h4>
          <ul className="order-totals">
            <li>
              Package <span>{currentPackage.name}</span>
            </li>
            <li>
              Speed <span>{currentPackage.speed}</span>
            </li>
            <li>
              Devices <span>{currentPackage.devices}</span>
            </li>
            <li>
              Expires <span>{currentPackage.expires}</span>
            </li>
            <li>
              Price <span>{currentPackage.price}</span>
            </li>
          </ul>

          {/* Cancel button */}
          <button
            className="theme-btn btn-style-one w-100 mt-2 text-dark"
            onClick={handleCancel}
          >
            <i className="fas fa-times me-1" />
            Cancel Package
          </button>
        </div>
      )}

      {/* AVAILABLE PACKAGES */}
      <div className="order-box">
        <h4>
          <i className="fas fa-list text-primary" /> Available Packages
        </h4>
        <div className="row">
          {packages.map((pkg, index) => {
            const actionLabel = getUpgradeDowngradeLabel(pkg);
            const isCurrent = actionLabel === "Current Plan";

            return (
              <div className="col-lg-6 col-md-12 mb-3" key={pkg.name}>
                <div
                  className={`p-3 border rounded shadow-sm position-relative ${
                    isCurrent
                      ? "bg-primary text-white"
                      : colors[index % colors.length]
                  }`}
                >
                  {isCurrent ? (
                    <span
                      className="badge bg-light text-primary position-absolute top-0 end-0 m-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Current
                    </span>
                  ) : (
                    <span
                      className={`badge ${
                        actionLabel === "Upgrade"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      } position-absolute top-0 end-0 m-2`}
                      style={{ fontSize: "0.8rem" }}
                    >
                      {actionLabel}
                    </span>
                  )}

                  <h5>{pkg.name}</h5>
                  <ul className="order-totals">
                    <li>
                      Speed <span>{pkg.speed}</span>
                    </li>
                    <li>
                      Devices <span>{pkg.devices}</span>
                    </li>
                    <li>
                      Price <span>{pkg.price}</span>
                    </li>
                  </ul>

                  {!isCurrent && (
                    <button
                      className={`theme-btn pay-btn w-100 mt-2 ${
                        actionLabel === "Upgrade"
                          ? "text-white"
                          : "text-dark btn-style-four"
                      }`}
                      onClick={() => handleSubscribe(pkg)}
                    >
                      <i className="fas fa-arrow-up me-1" />
                      {actionLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
