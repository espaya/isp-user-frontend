import { Lock, Smartphone } from "lucide-react";

const renderDetailsForm = (method, details, setDetails, errors) => {
  if (!details) return null;

  const formatCardNumber = (value = "") => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    return v.match(/.{1,4}/g)?.join(" ") || v;
  };

  const formatExpiry = (value = "") => {
    const v = value.replace(/\D/g, "").slice(0, 4);
    return v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
  };

  if (method === "card") {
    return (
      <div className="vstack gap-2">
        <div className="bg-primary bg-opacity-10 p-2 rounded-2 mb-2 d-flex align-items-center gap-1">
          <Lock size={14} className="text-primary" />
          <span className="small fw-medium text-primary">
            Details are encrypted & secure
          </span>
        </div>

        <label className="form-label small fw-medium text-dark mb-1">
          Card Number
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="1234 5678 9012 3456"
          value={formatCardNumber(details.cardNumber)}
          onChange={(e) =>
            setDetails({ ...details, cardNumber: e.target.value })
          }
          maxLength={19}
        />
        {errors?.cardNumber && (
          <small className="text-danger">{errors.cardNumber}</small>
        )}

        <div className="row g-2">
          <div className="col-6">
            <label className="form-label small fw-medium text-dark mb-1">
              Expiry
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="MM/YY"
              value={formatExpiry(details.expiry)}
              onChange={(e) =>
                setDetails({ ...details, expiry: e.target.value })
              }
              maxLength={5}
            />
            {errors?.expiry && (
              <small className="text-danger">{errors.expiry}</small>
            )}
          </div>

          <div className="col-6">
            <label className="form-label small fw-medium text-dark mb-1">
              CVV
            </label>
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="123"
              value={details.cvv}
              onChange={(e) => setDetails({ ...details, cvv: e.target.value })}
              maxLength={4}
            />
            {errors?.cvv && <small className="text-danger">{errors.cvv}</small>}
          </div>
        </div>

        <label className="form-label small fw-medium text-dark mb-1">
          Name on Card
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="John Doe"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        {errors?.name && <small className="text-danger">{errors.name}</small>}
      </div>
    );
  }

  // Mobile money
  return (
    <div className="vstack gap-2">
      <div className="bg-success bg-opacity-10 p-2 rounded-2 mb-2 d-flex align-items-center gap-1">
        <Smartphone size={14} className="text-success" />
        <span className="small fw-medium text-success">
          Payment prompt will be sent to your phone
        </span>
      </div>

      <div>
        <label className="form-label small fw-medium text-dark mb-1">
          Name
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="John Doe"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        {errors?.name && <small className="text-danger">{errors.name}</small>}
      </div>

      <div>
        <label className="form-label small fw-medium text-dark mb-1">
          Mobile Money Number
        </label>
        <input
          type="tel"
          className="form-control form-control-sm"
          placeholder="24 123 4567"
          value={details.phone}
          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
        />
        {errors?.phone && <small className="text-danger">{errors.phone}</small>}
      </div>

      <div>
        <label className="form-label small fw-medium text-dark mb-1">
          Provider
        </label>
        <select
          className="form-select form-select-sm"
          value={details.provider}
          onChange={(e) => setDetails({ ...details, provider: e.target.value })}
        >
          <option value="">Select provider</option>
          <option value="mtn">MTN</option>
          <option value="telecel">Telecel</option>
        </select>
        {errors?.provider && (
          <small className="text-danger">{errors.provider}</small>
        )}
      </div>

      <div>
        <label className="form-label small fw-medium text-dark mb-1">
          Email
        </label>
        <input
          type="email"
          className="form-control form-control-sm"
          placeholder="john.d@example.com"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        {errors?.email && <small className="text-danger">{errors.email}</small>}
      </div>
    </div>
  );
};

export default renderDetailsForm;
