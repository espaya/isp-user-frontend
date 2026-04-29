import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import useLogout from "../../components/auth/logout";

export default function ShowSubscriptionDetails() {
  const { trxref, reference } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const apiBase = import.meta.env.VITE_API_URL;

  const logout = useLogout();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchSubscription() {
      try {
        console.log(
          "Fetching subscription with token:",
          token ? "Token exists" : "No token",
        );
        console.log(
          "API URL:",
          `${apiBase}/api/subscriptions/by-reference/${reference}`,
        );

        const res = await fetch(
          `${apiBase}/api/subscriptions/by-reference/${reference}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Response status:", res.status);
        console.log("Response redirect URL:", res.url);

        // Check if we were redirected
        if (res.redirected) {
          console.error("Request was redirected to:", res.url);
          setError("Authentication failed. Please login again.");
          // Redirect to login
          logout();
          return;
        }

        const json = await res.json();
        console.log("Response data:", json);

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            setError("Session expired. Please login again.");
            logout();
          } else {
            setError(json.message || "Failed to fetch subscription");
          }
        } else {
          setData(json);
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    if (reference && token) {
      fetchSubscription();
    } else if (!token) {
      setError("No authentication token found. Please login.");
      setLoading(false);
    }
  }, [trxref, reference, token, logout, apiBase]);

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

              <p>
                <strong>Internet Login Link:</strong>
                <br />
                <small>
                  Use your email and the password below to access internet
                </small>
                <br />
                <a onClick={logout} href="#">
                  Internet Login
                </a>
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
