import { useSearchParams } from "react-router-dom";
import {
  WifiOff,
  User,
  Network,
  IdCard,
  Clock,
  Hourglass,
  Upload,
  Download,
  LogIn,
} from "lucide-react";

export default function InternetSignout() {
  const [searchParams] = useSearchParams();

  const username = searchParams.get("username");
  const ip = searchParams.get("ip");
  const mac = searchParams.get("mac");
  const uptime = searchParams.get("uptime");
  const timeLeft = searchParams.get("session_time_left");
  const bytesIn = searchParams.get("bytes_in");
  const bytesOut = searchParams.get("bytes_out");

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";

    const num = Number(bytes);
    if (isNaN(num)) return bytes;

    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(num) / Math.log(1024));

    return (num / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

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
              <h4 className="mb-3 fw-bold text-danger">
                <WifiOff size={22} className="me-2" />
                You have logged out!
              </h4>

              <p className="text-muted mb-4">
                Your internet session has ended successfully.
              </p>

              <div className="text-start">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <User size={18} className="me-2" />
                    Username
                  </span>
                  <span className="fw-bold">{username}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Network size={18} className="me-2" />
                    IP Address
                  </span>
                  <span className="fw-bold">{ip}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <IdCard size={18} className="me-2" />
                    MAC Address
                  </span>
                  <span className="fw-bold">{mac}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Clock size={18} className="me-2" />
                    Session Time
                  </span>
                  <span className="fw-bold">{uptime}</span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Hourglass size={18} className="me-2" />
                    Time Left
                  </span>
                  <span className="fw-bold text-success">
                    {timeLeft || "0s"}
                  </span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Upload size={18} className="me-2" />
                    Upload
                  </span>
                  <span className="fw-bold">{formatBytes(bytesIn)}</span>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <span className="text-muted d-flex align-items-center">
                    <Download size={18} className="me-2" />
                    Download
                  </span>
                  <span className="fw-bold">{formatBytes(bytesOut)}</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-primary w-100 rounded-3 d-flex justify-content-center align-items-center"
                  onClick={() => (window.location.href = "/login")}
                >
                  <LogIn size={20} className="me-2" />
                  Login Again
                </button>

                <button
                  className="btn btn-outline-secondary w-100 mt-2 rounded-3"
                  onClick={() => (window.location.href = "/")}
                >
                  Go Home
                </button>
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
