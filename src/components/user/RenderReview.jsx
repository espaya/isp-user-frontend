import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import getProvider from "../../utils/GetProvider";

export default function RenderReview({ details, pkg, method }) {
  const [provider, setProvider] = useState("N/A");

  useEffect(() => {
    if (details.payment_method === "mobile_money") {
      // Use provided value or auto-detect from phone
      setProvider(details.provider || getProvider(details.phone));
    }
  }, [details]);

  return (
    <div className="vstack gap-2">
      {/* Header */}
      <div className="bg-success bg-opacity-10 p-2 rounded-2 mb-2 d-flex align-items-center gap-1">
        <CheckCircle className="text-success" size={16} />
        <span className="small fw-medium text-success">Review Payment</span>
      </div>

      {/* Payment details */}
      <div className="border border-light rounded-2 overflow-hidden">
        <div className="divide-y">
          {/* Name */}
          <div className="d-flex justify-content-between p-2">
            <span className="text-muted small">Name</span>
            <span className="fw-semibold small">{details.name}</span>
          </div>

          {/* Mobile Money */}
          {details.payment_method?.trim().toLowerCase() === "mobile_money" && (
            <>
              <div className="d-flex justify-content-between p-2">
                <span className="text-muted small">Phone</span>
                <span className="fw-semibold small">{details.phone}</span>
              </div>

              <div className="d-flex justify-content-between p-2">
                <span className="text-muted small">Email</span>
                <span className="fw-semibold small">{details.email}</span>
              </div>

              <div className="d-flex justify-content-between p-2">
                <span className="text-muted small">Provider</span>
                <span className="fw-bold text-dark">{provider}</span>
              </div>
            </>
          )}

          {/* Card */}
          {details.payment_method === "card" && (
            <>
              <div className="d-flex justify-content-between p-2">
                <span className="text-muted small">CVV</span>
                <span className="fw-semibold small">{details.cvv}</span>
              </div>
              <div className="d-flex justify-content-between p-2">
                <span className="text-muted small">Card Number</span>
                <span className="fw-semibold small">{details.cardNumber}</span>
              </div>
              <div className="d-flex justify-content-between p-2">
                <span className="text-muted small">Expiry</span>
                <span className="fw-semibold small">{details.expiry}</span>
              </div>
            </>
          )}

          {/* Package */}
          <div className="d-flex justify-content-between p-2">
            <span className="text-muted small">Package</span>
            <span className="fw-semibold small">{pkg.name}</span>
          </div>

          {/* Amount */}
          <div className="d-flex justify-content-between p-2">
            <span className="text-muted small">Amount</span>
            <span className="fw-bold text-dark">GHS {pkg.price}</span>
          </div>

          {/* Payment Method */}
          <div className="d-flex justify-content-between p-2">
            <span className="text-muted small">Payment Method</span>
            <span className="fw-semibold small">
              {method === "mobile_money" ? "Mobile Money" : "Card"}
            </span>
          </div>

          {/* Total */}
          <div className="d-flex justify-content-between p-2 bg-light">
            <span className="text-muted fw-semibold small">Total</span>
            <span className="fw-bold text-success">
              GHS {(pkg.price * 1.005).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Authorization */}
      <div className="d-flex align-items-start p-2 bg-primary bg-opacity-5 rounded-2 gap-2">
        <AlertCircle className="text-primary" size={14} />
        <span className="small text-white fw-medium">
          By confirming, you authorize this secure payment.
        </span>
      </div>
    </div>
  );
}
