import { useState } from "react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const apiBase = import.meta.env.VITE_API_URL;
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    setSuccessMessage("");

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });

      const response = await fetch(`${apiBase}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Registration successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        setTimeout(() => {
          setSuccessMessage("");
          setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
        }, 3500);
        return;
      }

      setError(data.errors || { general: data.message });
    } catch (err) {
      setError({ general: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error.general && (
        <p className="alert alert-danger text-center">{error.general}</p>
      )}
      {successMessage && (
        <p className="alert alert-success text-center">{successMessage}</p>
      )}
      <div className="form-column col-lg-6 col-md-12 col-sm-12 mx-auto">
        <h3>Register</h3>

        <div className="inner-column">
          <div className="default-form style-two">
            <form onSubmit={submitForm} method="post">
              <div className="form-group">
                <label>Username*</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  autoComplete="off"
                />
                {error.name && (
                  <small className="text-danger">{error.name[0]}</small>
                )}
              </div>
              <div className="form-group">
                <label>Email address*</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {error.email && (
                  <small className="text-danger">{error.email[0]}</small>
                )}
              </div>

              <div className="form-group position-relative">
                <label>Password*</label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  className="form-control"
                  onChange={handleChange}
                />

                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  />
                </span>

                {error.password && (
                  <small className="text-danger">{error.password[0]}</small>
                )}
              </div>

              <div className="form-group position-relative">
                <label>Repeat Password*</label>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  autoComplete="off"
                  className="form-control"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                />

                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`fas ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </span>

                {error.password_confirmation && (
                  <small className="text-danger">
                    {error.password_confirmation[0]}
                  </small>
                )}
              </div>

              <div className="form-group">
                <div className="text">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <a href="privacy.html">privacy policy.</a>
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="theme-btn btn-style-four w-100"
                  disabled={loading}
                >
                  <span className="btn-wrap">
                    <span className="text-one">
                      {loading ? "Registering..." : "Register"}{" "}
                      <i className="fas fa-arrow-right fa-fw" />
                    </span>
                    <span className="text-two">
                      {loading ? "Registering..." : "Register"}{" "}
                      <i className="fas fa-arrow-right fa-fw" />
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
