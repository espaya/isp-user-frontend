export default function CurrentPackageCard({ currentPackage, handleCancel, setCurrentPackage }) {
  return (
    <>
      <div className="card border-0 shadow rounded-4 mb-5 overflow-hidden">
        <div
          className="p-4 text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #22c55e)" }}
        >
          <h5 className="fw-semibold mb-0">
            <i className="fas fa-crown me-2 text-warning" />
            Current Package
          </h5>
        </div>

        <div className="card-body">
          <div className="row g-4">
            {[
              {
                label: "Package",
                value: currentPackage.name,
                icon: "fa-box",
                color: "primary",
              },
              {
                label: "Speed",
                value: currentPackage.speed,
                icon: "fa-tachometer-alt",
                color: "info",
              },
              {
                label: "Devices",
                value: `${currentPackage.devices} device(s)`,
                icon: "fa-users",
                color: "success",
              },
              {
                label: "Expires",
                value: currentPackage.expires,
                icon: "fa-clock",
                color: "warning",
              },
              {
                label: "Price",
                value: `GHS ${parseInt(currentPackage.price, 10)}`,
                icon: "fa-money-bill-wave",
                color: "danger",
              },
              // Data Usage
              {
                label: "Data Usage",
                value: `${currentPackage.data_used || 0} / ${currentPackage.data_limit || "Unlimited"} GB`,
                icon: "fa-chart-bar",
                isProgress: true,
                progress: currentPackage.data_limit
                  ? ((currentPackage.data_used || 0) /
                      currentPackage.data_limit) *
                    100
                  : 0,
              },
            ].map((item) => {
              const usagePercent = item.progress || 0;

              // Determine gradient color based on usage
              let barColor = `linear-gradient(to right, #3b82f6, #3b82f6)`; // blue default
              if (usagePercent >= 70 && usagePercent < 90) {
                barColor = `linear-gradient(to right, #facc15, #f59e0b)`; // yellow
              } else if (usagePercent >= 90) {
                barColor = `linear-gradient(to right, #ef4444, #b91c1c)`; // red
              }

              return (
                <div className="col-md-6 col-lg-4" key={item.label}>
                  <div className="p-3 rounded-4 shadow-sm bg-white position-relative">
                    <div className={`text-${item.color} fs-4 mb-2`}>
                      <i className={`fas ${item.icon}`} />
                    </div>
                    <p className="small text-muted mb-1">{item.label}</p>
                    <h6 className="fw-semibold">{item.value}</h6>

                    {/* Progress Bar */}
                    {item.isProgress && (
                      <div className="mt-2">
                        <div
                          className="d-flex justify-content-between align-items-center mb-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <span>Usage</span>
                          <span>{Math.round(usagePercent)}%</span>
                        </div>
                        <div
                          className="progress"
                          style={{
                            height: "8px",
                            borderRadius: "4px",
                            backgroundColor: "#e5e7eb",
                          }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${Math.min(usagePercent, 100)}%`,
                              transition:
                                "width 1s ease-in-out, background 1s ease-in-out",
                              background: barColor,
                            }}
                            aria-valuenow={usagePercent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>

                        {/* Refresh Button */}
                        <button
                          className="btn btn-sm btn-outline-primary mt-2"
                          onClick={() => {
                            // Simulate fetching new data usage
                            const newUsed = Math.min(
                              (currentPackage.data_used || 0) +
                                Math.floor(Math.random() * 5),
                              currentPackage.data_limit || Infinity,
                            );
                            setCurrentPackage({
                              ...currentPackage,
                              data_used: newUsed,
                            });
                          }}
                          type="button"
                        >
                          Refresh Usage
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="d-flex gap-2 mt-4">
            <button className="btn btn-outline-secondary w-50">
              <i className="fas fa-sync-alt me-1" /> Renew Package
            </button>
            <button
              className="btn btn-outline-danger w-50"
              onClick={handleCancel}
            >
              <i className="fas fa-times me-1" /> Cancel Package
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
