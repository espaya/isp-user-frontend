export default function Payments() {
  const payments = [
    {
      amount: "¢10",
      package: "Daily Package",
      date: "Today",
      status: "Success",
      icon: "fas fa-wifi",
    },
    {
      amount: "¢50",
      package: "Weekly Package",
      date: "Last Week",
      status: "Success",
      icon: "fas fa-calendar-alt",
    },
    {
      amount: "¢120",
      package: "Monthly Package",
      date: "2 Months Ago",
      status: "Failed",
      icon: "fas fa-exclamation-triangle",
    },
  ];

  return (
    <div className="order-box p-3 shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          <i className="fas fa-history text-warning me-2" />
          Payment History
        </h5>

        <span className="badge bg-light text-dark border">
          {payments.length} Payments
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-sm align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Package</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="text-end">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="me-2 d-flex justify-content-center align-items-center rounded-circle bg-light"
                      style={{ width: 32, height: 32 }}
                    >
                      <i className={`${payment.icon} text-primary`} />
                    </div>

                    <div>
                      <strong className="d-block">{payment.package}</strong>
                      <small className="text-muted">Transaction #{index + 1}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="fw-bold text-dark">{payment.amount}</span>
                </td>

                <td>
                  <small className="text-muted">{payment.date}</small>
                </td>

                <td className="text-end">
                  <span
                    className={`badge ${
                      payment.status === "Success"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-outline-primary btn-sm w-100 mt-3">
        <i className="fas fa-file-invoice me-2" /> View Full History
      </button>
    </div>
  );
}
