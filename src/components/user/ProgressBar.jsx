import { CheckCircle } from "lucide-react";

const renderProgressBar = (step) => (
  <div className="px-3 pt-3">
    <div className="d-flex align-items-center justify-content-between mb-2">
      {["Method", "Details", "Review"].map((label, i) => (
        <div key={label} className="d-flex flex-column align-items-center">
          <div
            className={`d-flex align-items-center justify-content-center w-6 h-6 rounded-circle mb-1 transition-circle ${
              step > i + 1
                ? "bg-success text-white active"
                : step === i + 1
                  ? "bg-primary text-white active"
                  : "bg-light text-muted"
            }`}
          >
            {step > i + 1 ? <CheckCircle size={12} /> : i + 1}
          </div>
          <span
            className={`text-xs fw-medium ${step === i + 1 ? "text-primary" : "text-muted"}`}
            style={{ fontSize: "0.7rem" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
    <div className="progress h-1 bg-light rounded-pill">
      <div
        className="progress-bar bg-gradient-primary"
        style={{ width: `${((step - 1) / 2) * 100}%` }}
      />
    </div>
  </div>
);

export default renderProgressBar;
