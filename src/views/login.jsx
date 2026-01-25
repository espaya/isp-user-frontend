import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <title>Novanet - Login / Register</title>
      <div className="page-wrapper">
        <Header />

        <section
          className="page-title_two"
          style={{ backgroundImage: "url(images/background/page-title-2.jpg)" }}
        >
          <div
            className="page-title_two-gradient"
            style={{ backgroundImage: "url(images/background/pattern-6.png)" }}
          />
          <div className="auto-container">
            <h2>{activeTab === "login" ? "Login" : "Register"}</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>{activeTab === "login" ? "Login" : "Register"}</li>
            </ul>
          </div>
        </section>

        <section className="register-one">
          <div className="auto-container">
            {/* Tabs */}
            <div className="tabs mb-4">
              <ul
                className="tab-buttons d-flex justify-content-center list-unstyled"
                style={{ gap: "1rem", padding: 0 }}
              >
                <li
                  onClick={() => setActiveTab("login")}
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "25px",
                    border:
                      activeTab === "login"
                        ? "2px solid #0d6efd"
                        : "2px solid #ccc",
                    backgroundColor:
                      activeTab === "login" ? "#0d6efd" : "#f8f9fa",
                    color: activeTab === "login" ? "white" : "#333",
                    fontWeight: activeTab === "login" ? "600" : "500",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "login")
                      e.currentTarget.style.backgroundColor = "#e2e6ea";
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "login")
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  Login
                </li>
                <li
                  onClick={() => setActiveTab("register")}
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "25px",
                    border:
                      activeTab === "register"
                        ? "2px solid #0d6efd"
                        : "2px solid #ccc",
                    backgroundColor:
                      activeTab === "register" ? "#0d6efd" : "#f8f9fa",
                    color: activeTab === "register" ? "white" : "#333",
                    fontWeight: activeTab === "register" ? "600" : "500",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "register")
                      e.currentTarget.style.backgroundColor = "#e2e6ea";
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "register")
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  Register
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "login" && (
                <div className="form-column col-lg-6 col-md-12 col-sm-12 mx-auto">
                  <h3>Login</h3>
                  <div className="inner-column">
                    <div className="default-form style-two">
                      <form method="post" action="blog.html">
                        <div className="form-group">
                          <label>Username or Email Address*</label>
                          <input type="text" name="email" autoComplete="off" />
                        </div>
                        <div className="form-group">
                          <label>Password*</label>
                          <input
                            type="password"
                            name="password"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <div className="check-box">
                            <input
                              type="checkbox"
                              name="remember-password"
                              id="type-1"
                            />
                            <label htmlFor="type-1">Remember me</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="theme-btn btn-style-four w-100"
                          >
                            <span className="btn-wrap">
                              <span className="text-one">
                                Log in{" "}
                                <i className="fas fa-arrow-right fa-fw" />
                              </span>
                              <span className="text-two">
                                Log in{" "}
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
              )}

              {activeTab === "register" && (
                <div className="form-column col-lg-6 col-md-12 col-sm-12 mx-auto">
                  <h3>Register</h3>
                  <div className="inner-column">
                    <div className="default-form style-two">
                      <form method="post" action="blog.html">
                        <div className="form-group">
                          <label>Username*</label>
                          <input
                            type="text"
                            name="username"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email address*</label>
                          <input type="email" name="email" autoComplete="off" />
                        </div>
                        <div className="form-group">
                          <label>Password*</label>
                          <input
                            type="password"
                            name="password"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <div className="text">
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account, and for other purposes described in
                            our <a href="privacy.html">privacy policy.</a>
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="theme-btn btn-style-four w-100"
                          >
                            <span className="btn-wrap">
                              <span className="text-one">
                                Register{" "}
                                <i className="fas fa-arrow-right fa-fw" />
                              </span>
                              <span className="text-two">
                                Register{" "}
                                <i className="fas fa-arrow-right fa-fw" />
                              </span>
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fas fa-arrow-up fa-fw" />
      </div>
    </>
  );
}
