import { useEffect, useState } from "react";
import FetchPayments from "../../controllers/FetchPayments";
import formatDate from "../../utils/formatDate";
import { Banknote } from "lucide-react";

export default function Payments() {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchPayments(
        setLoading,
        setErrors,
        setPayments,
        apiBase,
        page,
      );

      // If FetchPayments returns full response, store pagination meta
      if (res) {
        setPagination(res);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="order-box p-3 shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          <i className="fas fa-history text-warning me-2" />
          Payment History
        </h5>

        <span className="badge bg-light text-dark border">
          {pagination?.total || payments.length} Payments
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-muted text-center mb-3">Loading payments...</p>
      )}

      {/* Empty */}
      {!loading && payments.length === 0 && (
        <p className="text-muted text-center mb-0">No payments found.</p>
      )}

      {payments.length > 0 && (
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
                <tr key={payment.id || index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="me-2 d-flex justify-content-center align-items-center rounded-circle bg-light"
                        style={{ width: 35, height: 35 }}
                      >
                        <Banknote size={18} className="text-success" />
                      </div>

                      <div>
                        <strong className="d-block">
                          {payment.package?.name ||
                            payment.package ||
                            "Package"}
                        </strong>
                        <small className="text-muted">
                          Ref: {payment.reference || `TX-${index + 1}`}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="fw-bold text-dark">
                      ¢
                      {Number(payment.amount / 100).toLocaleString("en-GH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>

                  <td>
                    <small className="text-muted">
                      {formatDate(payment.created_at)}
                    </small>
                  </td>

                  <td className="text-end">
                    <span
                      className={`badge ${
                        payment.status === "success"
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
      )}

      {/* Pagination */}
      {pagination?.last_page > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <i className="fas fa-arrow-left me-1" /> Prev
          </button>

          <span className="text-muted small">
            Page <strong>{page}</strong> of{" "}
            <strong>{pagination.last_page}</strong>
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === pagination.last_page}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <i className="fas fa-arrow-right ms-1" />
          </button>
        </div>
      )}
    </div>
  );
}
