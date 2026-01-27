import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import useLogout from "../components/auth/logout";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function DashboardLayout() {
  const location = useLocation(); // get current path
  const logout = useLogout();
  const { user } = useContext(AuthContext);

  document.title = "Dashboard - ISP Automated Payment System";

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "fas fa-home" },
    {
      path: "/dashboard/package",
      label: "My Package",
      icon: "fas fa-wifi text-success",
    },
    {
      path: "/dashboard/payments",
      label: "Payments",
      icon: "fas fa-history text-warning",
    },
    {
      path: "/dashboard/account",
      label: "Account",
      icon: "fas fa-user text-primary",
    },
  ];

  return (
    <div className="page-wrapper">
      <Header />

      {/* Page Title */}
      <section
        className="page-title_two"
        style={{ backgroundImage: "url(/images/background/page-title-2.jpg)" }}
      >
        <div
          className="page-title_two-gradient"
          style={{ backgroundImage: "url(/images/background/pattern-6.png)" }}
        />
        <div className="auto-container">
          <h2>User Dashboard</h2>
          <ul className="bread-crumb clearfix">
            <li>Home</li>
            <li>Dashboard</li>
          </ul>
        </div>
      </section>

      {/* MAIN AREA */}
      <section className="checkout-section">
        <div className="auto-container">
          <div className="row clearfix">
            {/* SIDEBAR */}
            <div className="col-lg-3 col-md-12 mb-4">
              <div className="order-box text-center">
                {/* PROFILE */}
                <div className="mb-4">
                  <img
                    src="/images/avatar.png"
                    className="rounded-circle mb-2"
                    style={{ width: 90, height: 90 }}
                  />
                  <h5> {user && user ? user?.name : "Guest"} </h5>
                  <small className="text-muted">+233 55 000 0000</small>
                  <div className="mt-2">
                    <span className="badge bg-success">
                      <i className="fas fa-wifi me-1" /> Connected
                    </span>
                  </div>
                </div>

                {/* MENU */}
                <ul className="list-group text-start">
                  {menuItems.map((item) => (
                    <li
                      key={item.path}
                      className={`list-group-item ${
                        location.pathname === item.path
                          ? "active bg-primary text-white"
                          : ""
                      }`}
                    >
                      <NavLink
                        to={item.path}
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <i className={`${item.icon} me-2`}></i>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                  <li className="list-group-item decoration-none">
                    <button
                      className="d-flex align-items-center btn btn-link text-start w-100 p-0"
                      onClick={logout}
                      style={{ textDecoration: "none" }} // ✅ removes underline
                    >
                      <i className="fas fa-sign-out-alt text-danger me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* DYNAMIC CONTENT */}
            <div className="col-lg-9 col-md-12">
              <Outlet />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
