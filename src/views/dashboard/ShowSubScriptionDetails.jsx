import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import useLogout from "../../components/auth/logout";

export default function ShowSubscriptionDetails() {
  const { reference: pathReference } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const apiBase = import.meta.env.VITE_API_URL;
  const logout = useLogout();
  const token = localStorage.getItem("token");

  useEffect(() => {
    let reference = pathReference;
    if (!reference) {
      reference = searchParams.get("reference") || searchParams.get("trxref");
    }

    console.log(`Payment Reference: ${reference}`);

    if (!reference) {
      setError("No subscription reference found");
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 30;

    const fetchSubscription = async () => {
      try {
        const res = await fetch(
          `${apiBase}/api/subscriptions/by-reference/${reference}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const json = await res.json();

        if (res.ok && json.subscription) {
          setData(json);
          setLoading(false);
          return true;
        }

        // Check payment status if subscription not found
        const statusRes = await fetch(
          `${apiBase}/api/paystack/status/${reference}`,
        );
        const statusData = await statusRes.json();

        if (statusData.payment_status === "success") {
          // Retry fetching subscription
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(fetchSubscription, 2000);
          } else {
            setError(
              "Payment confirmed but subscription activation delayed. Please contact support.",
            );
            setLoading(false);
          }
        } else if (statusData.payment_status === "pending") {
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(fetchSubscription, 2000);
          } else {
            setError(
              "Payment still pending. Please check your email for confirmation.",
            );
            setLoading(false);
          }
        } else {
          setError(json.message || "Failed to fetch subscription");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error:", err);
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(fetchSubscription, 2000);
        } else {
          setError("Network error. Please refresh the page.");
          setLoading(false);
        }
      }
    };

    if (token) {
      fetchSubscription();
    } else {
      setError("Please login to view your subscription.");
      setLoading(false);
    }
  }, [pathReference, searchParams, token, apiBase]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="ms-3">Verifying your payment...</p>
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
                <strong>Device:</strong> {data.device ?? "N/A"}
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
                {formatDate(data.subscription.starts_at, true)}
              </p>
              <p>
                <strong>Expires At:</strong>
                <br />
                {formatDate(data.subscription.expires_at, true)}
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
