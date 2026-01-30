import { CheckCircle, CreditCard, Smartphone } from "lucide-react";

const renderMethodSelection = (pkg, method, setMethod) => {

  if (!pkg) {
    return <div className="text-danger">Package not loaded</div>;
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-muted small mb-1">Package</p>
        <div className="bg-white border border-light rounded-2 p-3 d-flex justify-content-between align-items-center">
          <h6 className="fw-bold text-dark mb-0">{pkg.name}</h6>
          <div className="h5 fw-bold text-dark mb-0">GHS {pkg.price}</div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold text-dark mb-2 small">
          Select Payment Method
        </label>

        <div className="vstack gap-2">
          {[
            {
              id: "mobile_money",
              name: "Mobile Money",
              icon: Smartphone,
              color: "bg-success bg-opacity-10 text-success",
            },
            {
              id: "card",
              name: "Credit/Debit Card",
              icon: CreditCard,
              color: "bg-primary bg-opacity-10 text-primary",
            },
          ].map((opt) => (
            <div
              key={opt.id}
              className={`d-flex align-items-center p-2 border rounded-2 ${
                method === opt.id
                  ? "border-primary bg-primary bg-opacity-5"
                  : "border-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setMethod(opt.id)}
            >
              <div className={`p-1 rounded ${opt.color}`}>
                <opt.icon size={16} />
              </div>

              <div className="ms-2 flex-grow-1">
                <div className="fw-semibold text-dark small">{opt.name}</div>
              </div>

              {method === opt.id && (
                <div className="d-flex align-items-center justify-content-center w-5 h-5 rounded-circle bg-primary">
                  <CheckCircle size={10} className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default renderMethodSelection;
