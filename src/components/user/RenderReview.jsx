import { CheckCircle, AlertCircle } from "lucide-react";

const renderReview = (details, pkg, method) => (
  <div className="vstack gap-2">
    <div className="bg-success bg-opacity-10 p-2 rounded-2 mb-2 d-flex align-items-center gap-1">
      <CheckCircle className="text-success" size={16} />
      <span className="small fw-medium text-success">Review Payment</span>
    </div>
    <div className="border border-light rounded-2 overflow-hidden">
      <div className="divide-y">
        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Name</span>
          <span className="fw-semibold small">{details.name}</span>
        </div>

        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Phone</span>
          <span className="fw-semibold small">{details.phone}</span>
        </div>

        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Email</span>
          <span className="fw-semibold small">{details.email}</span>
        </div>

        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Package</span>
          <span className="fw-semibold small">{pkg.name}</span>
        </div>
        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Amount</span>
          <span className="fw-bold text-dark">GHS {pkg.price}</span>
        </div>
        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Payment Method</span>
          <span className="fw-semibold small">
            {method === "mobile_money" ? "Mobile Money" : "Card"}
          </span>
        </div>
        <div className="d-flex justify-content-between p-2">
          <span className="text-muted small">Provider</span>
          <span className="fw-bold text-dark">
            {details.provider
              ? details.provider.charAt(0).toUpperCase() +
                details.provider.slice(1)
              : ""}
          </span>
        </div>

        <div className="d-flex justify-content-between p-2 bg-light">
          <span className="text-muted fw-semibold small">Total</span>
          <span className="fw-bold text-success">
            GHS {(pkg.price * 1.005).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
    <div className="d-flex align-items-start p-2 bg-primary bg-opacity-5 rounded-2 gap-2">
      <AlertCircle className="text-primary" size={14} />
      <span className="small text-white fw-medium">
        By confirming, you authorize this secure payment.
      </span>
    </div>
  </div>
);

export default renderReview;
