import { useState, useEffect } from "react";
import validateStep from "../../utils/ValidateStep";
import { CreditCard, Shield } from "lucide-react";
import renderProgressBar from "./ProgressBar";
import renderMethodSelection from "./MethodSelection";
import renderDetailsForm from "./RenderDetailsForm";
import renderReview from "./RenderReview";

export default function PaymentModal({
  show,
  onClose,
  onConfirm,
  pkg,
  paymentLoading,
}) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState({
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    email: "",
    provider: "",
  });

  if (!show || !pkg) return null;

  const handleNext = () => {
    if (!validateStep(step, method, details, setErrors)) return;

    if (step < 3) setStep(step + 1);
    else handleConfirm();
  };

  const handleBack = () => (step > 1 ? setStep(step - 1) : onClose());

  const handleConfirm = () => {
    onConfirm({
      payment_method: method, // <- must match back-end
      phone: details.phone,
      name: details.name,
      email: details.email,
      card_number: details.cardNumber,
      expiry: details.expiry,
      cvv: details.cvv,
      provider: details.provider
    });
  };


  const getButtonText = () => {
    if (paymentLoading)
      return (
        <>
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
          ></span>
          Processing...
        </>
      );
    if (step === 1) return "Continue";
    if (step === 2) return "Review";
    return (
      <>
        Confirm & Pay <CreditCard size={12} />
      </>
    );
  };

  return (
    <>
      <div
        className={`modal-backdrop fade ${show ? "show" : ""}`}
        style={{ zIndex: 1040 }}
      />
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content rounded-3 border-0 shadow-lg">
            <div className="modal-header bg-gradient-primary text-white py-3 px-4">
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-bold mb-0 medium">
                    <Shield size={20} /> Secure Payment
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                    disabled={paymentLoading}
                  />
                </div>
              </div>
            </div>

            {renderProgressBar(step)}

            <div className="modal-body p-4">
              {step === 1 && renderMethodSelection(pkg, method, setMethod)}
              {step === 2 &&
                renderDetailsForm(method, details, setDetails, errors)}
              {step === 3 && renderReview(details, pkg, method)}
            </div>

            <div className="modal-footer bg-light px-4 py-3 d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleBack}
                disabled={paymentLoading}
              >
                {step === 1 ? "Cancel" : "Back"}
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={handleNext}
                disabled={(!method && step === 1) || paymentLoading}
              >
                {paymentLoading && (
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                  />
                )}
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0062e6 0%, #33aeff 100%);
        }
        .transition-circle {
          transition: all 0.3s ease;
        }
        .transition-circle.active {
          transform: scale(1.2);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
        }
        .form-control-sm {
          font-size: 0.875rem;
          border-radius: 0.5rem;
          padding: 0.375rem 0.75rem;
        }
        .btn-sm {
          font-size: 0.875rem;
          padding: 0.375rem 1rem;
        }
        .w-6 {
          width: 1.5rem;
          height: 1.5rem;
        }
        .h-6 {
          width: 1.5rem;
          height: 1.5rem;
        }
        .w-5 {
          width: 1.25rem;
          height: 1.25rem;
        }
      `}</style>
    </>
  );
}
