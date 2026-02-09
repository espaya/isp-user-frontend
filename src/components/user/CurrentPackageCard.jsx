import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";

export default function CurrentPackageCard({
  currentPackage,
  handleCancel,
}) {
  const pkg = currentPackage?.package; // ✅ extract the package object
  const reference = currentPackage?.payment?.reference; // extract payment reference

  if (!pkg) return <p>No package found</p>;

  return (
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
              value: pkg.name, // ✅ FIXED
              icon: "fa-box",
              color: "primary",
            },
            {
              label: "Speed",
              value: `${pkg.speed} Mbps`, // ✅ FIXED
              icon: "fa-tachometer-alt",
              color: "info",
            },
            {
              label: "Expires",
              value: formatDate(currentPackage.expires_at, true), // ✅ FIXED
              icon: "fa-clock",
              color: "warning",
            },
            {
              label: "Price",
              value: `GHS ${parseInt(pkg.price, 10)}`, // ✅ FIXED
              icon: "fa-money-bill-wave",
              color: "danger",
            },
          ].map((item) => (
            <div className="col-md-6 col-lg-3" key={item.label}>
              <div className="p-3 rounded-4 shadow-sm bg-white position-relative">
                <div className={`text-${item.color} fs-4 mb-2`}>
                  <i className={`fas ${item.icon}`} />
                </div>
                <p className="small text-muted mb-1">{item.label}</p>
                <h6 className="fw-semibold">{item.value}</h6>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-outline-secondary w-50">
            <i className="fas fa-sync-alt me-1" /> Renew Package
          </button>

          <Link
            className="btn btn-outline-success w-50"
            to={`/dashboard/payment/success/${reference}`}
          >
            <i className="fas fa-globe me-1" /> Internet Info
          </Link>
          <button
            className="btn btn-outline-danger w-50"
            onClick={handleCancel}
          >
            <i className="fas fa-times me-1" /> Cancel Package
          </button>
        </div>
      </div>
    </div>
  );
}
