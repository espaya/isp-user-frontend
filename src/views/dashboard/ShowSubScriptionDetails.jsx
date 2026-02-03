import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function ShowSubscriptionDetails() {
  const { trxref, reference } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch(
          `${apiBase}/api/subscriptions/by-reference/${reference}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
            },
          },
        );

        const json = await res.json();

        if (!res.ok) {
          setError(json.message || "Failed to fetch subscription");
        } else {
          setData(json);
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [trxref, reference]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  if (!data) return null;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Subscription Activated 🎉</h5>
            </div>

            <div className="card-body">
              <p>
                <strong>Device:</strong> {data.device}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge bg-success">
                  {data.subscription.status}
                </span>
              </p>

              <p>
                <strong>Starts At:</strong>
                <br />
                {new Date(data.subscription.starts_at).toLocaleString()}
              </p>

              <p>
                <strong>Expires At:</strong>
                <br />
                {new Date(data.subscription.expires_at).toLocaleString()}
              </p>

              <div className="alert alert-info mt-3">
                <strong>Internet Password:</strong>
                <h4 className="mt-2 mb-0 text-center">
                  {data.hotspot_password}
                </h4>
              </div>

              <p className="text-muted small text-center">
                Use this password to connect. It will stop working automatically
                when your subscription expires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
