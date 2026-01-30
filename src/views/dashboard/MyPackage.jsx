import { useContext, useEffect, useState } from "react";
import fetchPackages from "../../controllers/FetchPackages";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/AuthContext";
import PaymentModal from "../../components/user/PaymentModal";
import handlePaymentSuccess from "../../controllers/HandlePayment";
import CurrentPackageCard from "../../components/user/CurrentPackageCard";

export default function MyPackage() {
  const [currentPackage, setCurrentPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [pagination, setPagination] = useState({});
  const { user } = useContext(AuthContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSubscribe = async (pkg) => {
    setErrors({});

    const confirm = await Swal.fire({
      icon: "question",
      title: "Action Required",
      text: "Proceed to payment for this package?",
      showCancelButton: true,
      confirmButtonText: "Continue",
      confirmButtonColor: "green",
    });

    if (!confirm.isConfirmed) return;

    // 🔥 Let SweetAlert fully close first
    Swal.close();

    // 🔥 Small delay to release backdrop & focus trap
    setTimeout(() => {
      setSelectedPackage(pkg);
      setShowPaymentModal(true);
    }, 150);
  };

  const handleCancel = () => setCurrentPackage(null);

  const getUpgradeDowngradeLabel = (pkg) => {
    if (!currentPackage) return "Upgrade";

    const currentPrice = parseInt(currentPackage.price || "0", 10);
    const pkgPrice = parseInt(pkg.price, 10);

    if (pkgPrice > currentPrice) return "Upgrade";
    if (pkgPrice < currentPrice) return "Downgrade";
    return "Current";
  };

  useEffect(() => {
    fetchPackages(setLoading, setErrors, apiBase, setPackages, setPagination);
  }, []);

  return (
    <div className="container-fluid">
      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" />
        </div>
      )}

      {/* CURRENT PACKAGE */}
      {currentPackage && currentPackage.name && (
        <CurrentPackageCard
          currentPackage={currentPackage}
          handleCancel={handleCancel}
          setCurrentPackage={setCurrentPackage}
        />
      )}

      {/* AVAILABLE PACKAGES */}
      <h5 className="fw-semibold mb-4">
        <i className="fas fa-layer-group text-primary me-2" />
        Available Packages
      </h5>

      {errors.general && (
        <p className="alert alert-danger text-center"> {errors.general} </p>
      )}

      <div className="row g-4">
        {packages.map((pkg) => {
          const actionLabel = getUpgradeDowngradeLabel(pkg);
          const isCurrent = actionLabel === "Current";

          return (
            <div className="col-lg-6" key={pkg.id}>
              <div className="card border-0 rounded-4 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <span
                    className={`badge align-self-end mb-2 ${
                      isCurrent
                        ? "bg-primary"
                        : actionLabel === "Upgrade"
                          ? "bg-success"
                          : "bg-warning text-dark"
                    }`}
                  >
                    {isCurrent ? "Current Plan" : actionLabel}
                  </span>

                  <h6 className="fw-semibold">{pkg.name}</h6>
                  <div className="fs-3 fw-bold mb-3">
                    GHS {parseInt(pkg.price, 10)}
                  </div>

                  <ul className="list-unstyled small mb-4">
                    <li>
                      <i className="fas fa-tachometer-alt me-2 text-info" />{" "}
                      {pkg.speed}
                    </li>
                    <li>
                      <i className="fas fa-users me-2 text-success" />{" "}
                      {pkg.devices} device(s)
                    </li>
                  </ul>

                  {!isCurrent && (
                    <button
                      className={`btn mt-auto ${actionLabel === "Upgrade" ? "btn-success" : "btn-outline-warning"}`}
                      onClick={() => handleSubscribe(pkg)}
                    >
                      {actionLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PaymentModal
        show={showPaymentModal}
        pkg={selectedPackage}
        paymentLoading={paymentLoading}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedPackage(null);
        }}
        onConfirm={(paymentData) =>
          handlePaymentSuccess(
            paymentData,
            {
              setLoading,
              setErrors,
              setCurrentPackage,
              setShowPaymentModal,
              setSelectedPackage,
              Swal,
            },
            { user, selectedPackage, apiBase },
          )
        }
      />

      {/* PAGINATION (DISPLAY ONLY) */}
      {pagination.last_page > 1 && (
        <nav className="mt-5 d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: pagination.last_page }, (_, i) => (
              <li
                key={i}
                className={`page-item ${pagination.current_page === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" disabled>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
