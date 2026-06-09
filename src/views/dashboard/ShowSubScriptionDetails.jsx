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

  // Debug logging at component start
  console.log("=== ShowSubscriptionDetails Component Mounted ===");
  console.log("Path Reference:", pathReference);
  console.log("All URL Params:", useParams());
  console.log("Search Params Object:", Object.fromEntries([...searchParams]));
  console.log("Token exists:", !!token);
  console.log("API Base:", apiBase);

  useEffect(() => {
    console.log("=== useEffect RUNNING ===");
    
    let reference = pathReference;
    if (!reference) {
      reference = searchParams.get("reference") || searchParams.get("trxref");
    }

    console.log("Final Reference Value:", reference);
    console.log("Reference type:", typeof reference);
    console.log("Reference length:", reference?.length);

    if (!reference) {
      console.error("No reference found in URL!");
      setError("No subscription reference found");
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 30;

    const fetchSubscription = async () => {
      console.log(`Attempt ${attempts + 1}: Fetching subscription for reference: ${reference}`);
      
      try {
        const url = `${apiBase}/api/subscriptions/by-reference/${reference}`;
        console.log("Fetching URL:", url);
        
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status);
        console.log("Response OK:", res.ok);
        console.log("Response redirected:", res.redirected);
        
        const json = await res.json();
        console.log("Response data:", json);

        if (res.ok && json.subscription) {
          console.log("Subscription found! Setting data...");
          setData(json);
          setLoading(false);
          return true;
        }

        // Check payment status if subscription not found
        const statusUrl = `${apiBase}/api/paystack/status/${reference}`;
        console.log("Checking payment status at:", statusUrl);
        
        const statusRes = await fetch(statusUrl);
        const statusData = await statusRes.json();
        console.log("Payment status response:", statusData);

        if (statusData.payment_status === "success") {
          if (attempts < maxAttempts) {
            attempts++;
            console.log(`Payment success but subscription not ready. Retry ${attempts}/${maxAttempts}`);
            setTimeout(fetchSubscription, 2000);
          } else {
            setError("Payment confirmed but subscription activation delayed. Please contact support.");
            setLoading(false);
          }
        } else if (statusData.payment_status === "pending") {
          if (attempts < maxAttempts) {
            attempts++;
            console.log(`Payment pending. Retry ${attempts}/${maxAttempts}`);
            setTimeout(fetchSubscription, 2000);
          } else {
            setError("Payment still pending. Please check your email for confirmation.");
            setLoading(false);
          }
        } else {
          setError(json.message || "Failed to fetch subscription");
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (attempts < maxAttempts) {
          attempts++;
          console.log(`Error, retrying ${attempts}/${maxAttempts}`);
          setTimeout(fetchSubscription, 2000);
        } else {
          setError("Network error. Please refresh the page.");
          setLoading(false);
        }
      }
    };

    if (token) {
      console.log("Token present, starting fetchSubscription");
      fetchSubscription();
    } else {
      console.error("No token found in localStorage");
      setError("Please login to view your subscription.");
      setLoading(false);
    }
  }, [pathReference, searchParams, token, apiBase]);

  console.log("Component render state:", { loading, error: !!error, hasData: !!data });

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