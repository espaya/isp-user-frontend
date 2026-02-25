import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Wifi,
  User,
  Network,
  IdCard,
  Upload,
  Download,
  Clock,
  Hourglass,
  LayoutDashboard,
  LogOut,
  DatabaseIcon,
  Phone,
  Laptop2,
  TimerIcon,
  Timer,
  TimerOff,
} from "lucide-react";

export default function Status() {
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [portalLoggedIn, setPortalLoggedIn] = useState(false);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const logoutUrl = searchParams.get("logout_url");
  const decodedLogout = logoutUrl ? decodeURIComponent(logoutUrl) : null;

  const ip = searchParams.get("ip");
  const mac = searchParams.get("mac");
  const username = searchParams.get("username");

  const [seeMore, setSeeMore] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!ip) {
      navigate("/login", { replace: true });
      return;
    }

    let interval;

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `${apiBase}/api/hotspot/status?ip=${ip}&mac=${mac}&username=${username}`,
          { Authorization: `Bearer ${token}` },
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch status");
          return;
        }

        setStatus(data.status);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [ip, mac, username, apiBase, navigate]);

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";

    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h5>Loading Internet Status...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-danger">{error}</h5>
        <p className="text-muted">Please try again.</p>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-danger">You are not connected to the internet.</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="mb-3 fw-bold text-center">
            <img
              src="/images/logo.png"
              alt="Novanet Logo"
              width="25%"
              height="25%"
              className="img-fluid mb-3"
              style={{ maxHeight: "70px" }}
            />
          </div>

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 text-center">
              <h4 className="mb-3 fw-bold">
                <Wifi size={22} className="text-success me-2" />
                Internet Status
              </h4>

              <p className="text-muted mb-4">
                You are currently connected to the internet.
              </p>

              <div className="text-start">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <User color="red" size={20} className="me-3" />
                    Username
                  </span>
                  <span className="fw-bold">{status.user}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Network color="green" size={20} className="me-3" />
                    IP Address
                  </span>
                  <span className="fw-bold">{status.ip}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <IdCard color="blue" size={20} className="me-3" />
                    MAC Address
                  </span>
                  <span className="fw-bold">{status.mac}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Upload color="orange" size={20} className="me-3" />
                    Upload
                  </span>
                  <span className="fw-bold">
                    {formatBytes(status.bytes_in)}
                  </span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Download color="purple" size={20} className="me-3" />
                    Download
                  </span>
                  <span className="fw-bold">
                    {formatBytes(status.bytes_out)}
                  </span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Clock color="gray" size={20} className="me-3" />
                    Connected
                  </span>
                  <span className="fw-bold">{status.uptime}</span>
                </div>

                <div className="border-bottom py-2 text-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSeeMore(!seeMore);
                    }}
                    className="text-decoration-none fw-bold"
                  >
                    {seeMore ? "See Less" : "See More Details"}
                  </a>
                </div>

                {seeMore && (
                  <>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="text-muted d-flex align-items-center">
                        <Hourglass color="pink" size={20} className="me-3" />
                        Time Left
                      </span>
                      <span className="fw-bold text-success">
                        {status.session_time_left || "Unlimited"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="text-muted d-flex align-items-center">
                        <DatabaseIcon
                          color="magenta"
                          size={20}
                          className="me-3"
                        />
                        Rate Limit
                      </span>
                      <span className="fw-bold text-success">
                        {status.rate_limit || "Unlimited"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="text-muted d-flex align-items-center">
                        <Laptop2 color="gold" size={20} className="me-3" />
                        Device(s) Shared
                      </span>
                      <span className="fw-bold text-success">
                        {status.shared_users || 1}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="text-muted d-flex align-items-center">
                        <TimerIcon color="black" size={20} className="me-3" />
                        Timeout
                      </span>
                      <span className="fw-bold text-success">
                        {status.session_timeout || "Unlimited"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                      <span className="text-muted d-flex align-items-center">
                        <TimerOff color="seagreen" size={20} className="me-3" />
                        Idle Time
                      </span>
                      <span className="fw-bold text-success">
                        {status.idle_time || "0s"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4">
                {!status.portal_logged_in ? (
                  <button
                    className="btn btn-warning w-100 rounded-3 d-flex justify-content-center align-items-center"
                    onClick={() => navigate("/login")}
                  >
                    <LayoutDashboard size={20} className="me-2" />
                    Login to Portal
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100 rounded-3 d-flex justify-content-center align-items-center"
                    onClick={() => navigate("/dashboard")}
                  >
                    <LayoutDashboard size={20} className="me-2" />
                    Go to Dashboard
                  </button>
                )}

                {logoutUrl && (
                  <button
                    className="btn btn-danger w-100 mt-2 rounded-3 d-flex justify-content-center align-items-center"
                    onClick={() => window.location.replace(decodedLogout)}
                  >
                    <LogOut size={20} className="me-2" />
                    Logout Internet
                  </button>
                )}
              </div>

              <small className="d-block text-muted mt-4">
                Powered by techdex 🚀
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
