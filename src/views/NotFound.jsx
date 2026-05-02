import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  // Check if there's a previous page in history
  const canGoBack = window.history.length > 1;

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          {canGoBack && (
            <button onClick={goBack} className="btn btn-secondary">
              <i className="fas fa-arrow-left me-2"></i>
              Go Back
            </button>
          )}
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home me-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
