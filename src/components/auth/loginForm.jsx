import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function LoginForm() {
  const apiBase = import.meta.env.VITE_API_URL;
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
    login_type: "",
  });

  const ip = new URLSearchParams(window.location.search).get("ip");
  const mac = new URLSearchParams(window.location.search).get("mac");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      // Login request
      const response = await fetch(`${apiBase}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formData, ip, mac }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors || { general: data.message });
        return;
      }

      localStorage.setItem("token", data.token);

      await fetchUser(); // Refresh user data after login

      if (data.internet_success) {
        navigate(`/dashboard/?success=${data.internet_success}`, {
          replace: true,
        });
      } else {
        // Redirect on success
        navigate(data.redirect_url || "/", { replace: true });
      }
    } catch (err) {
      setError({ general: `Error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error.general && (
        <p className="alert alert-danger text-center">{error.general}</p>
      )}

      <div className="form-column col-lg-6 col-md-12 col-sm-12 mx-auto">
        <h3>Login</h3>

        <div className="inner-column">
          <div className="default-form style-two">
            <form method="post" onSubmit={submitLogin}>
              <div className="form-group">
                <label>Email Address*</label>
                <input
                  value={formData.email}
                  type="text"
                  name="email"
                  autoComplete="off"
                  onChange={handleChange}
                />
                {error.email && (
                  <small className="text-danger">{error.email[0]}</small>
                )}
              </div>

              <div className="form-group position-relative">
                <label>Password*</label>
                <input
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "38px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
                {error.password && (
                  <small className="text-danger">{error.password[0]}</small>
                )}
              </div>

              <div className="form-group">
                <div className="check-box">
                  <input
                    type="checkbox"
                    name="remember" // ✅ matches state
                    id="type-1"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="type-1">Remember me</label>
                </div>
              </div>

              <div className="form-group">
                <label>Login Type</label>

                <select
                  name="login_type"
                  value={formData.login_type || ""}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select</option>
                  <option value="portal">Portal</option>
                  <option value="internet">Internet</option>
                </select>

                {error.login_type && (
                  <small className="text-danger">{error.login_type[0]}</small>
                )}
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="theme-btn btn-style-four w-100"
                  disabled={loading}
                >
                  <span className="btn-wrap">
                    <span className="text-one">
                      {loading ? "Logging in..." : "Log in"}
                      <i className="fas fa-arrow-right fa-fw" />
                    </span>
                    <span className="text-two">
                      {loading ? "Logging in..." : "Log in"}
                      <i className="fas fa-arrow-right fa-fw" />
                    </span>
                  </span>
                </button>
              </div>

              <div className="form-group text-center">
                <a href="#" className="forgot">
                  Lost your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
