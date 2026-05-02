import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet, NavLink, useLocation, useParams } from "react-router-dom";
import useLogout from "../components/auth/logout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import Avatar from "../components/Avatar";

export default function DashboardLayout() {
  const location = useLocation();
  const logout = useLogout();
  const { user } = useContext(AuthContext);
  const apiBase = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [hotspotData, setHotspotData] = useState(null);
  const [loadingHotspot, setLoadingHotspot] = useState(false);

  document.title = "Dashboard - ISP Automated Payment System";

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "fas fa-home" },
    {
      path: "/dashboard/package",
      label: "Available Package",
      icon: "fas fa-wifi text-success",
    },
    {
      path: "/dashboard/payments",
      label: "Payments",
      icon: "fas fa-money-bill-wave text-warning",
    },
    {
      path: "/dashboard/account",
      label: "Account",
      icon: "fas fa-user text-primary",
    },
  ];

  // get current internet/hotspot details
  const getHotspot = async () => {
    if (!token) return;
    
    setLoadingHotspot(true);
    try {
      const res = await fetch(`${apiBase}/api/hotspot-info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Hotspot info error:", data.message);
        setHotspotData(null);
        return;
      }

      setHotspotData(data);
    } catch (err) {
      console.error("Error fetching hotspot info:", err);
      setHotspotData(null);
    } finally {
      setLoadingHotspot(false);
    }
  };

  useEffect(() => {
    getHotspot();
  }, []);

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
                  <Avatar />
                  <h5> {user && user ? user?.name : "Guest"} </h5>
                  <small className="text-muted">
                    {" "}
                    {user && user ? user?.profile?.phone : "N.A"}{" "}
                  </small>
                </div>

                {/* MENU */}
                <ul className="list-group text-start">
                  {menuItems.map((item) => (
                    <li
                      key={item.path}
                      className="list-group-item p-0 border-0"
                    >
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                          `d-flex align-items-center text-decoration-none px-3 py-2 rounded
      ${isActive ? "bg-primary text-white" : "text-dark"}`
                        }
                      >
                        <i className={`${item.icon} me-2`}></i>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}

                  {/* Fixed: Only show if has_active_subscription is true and reference exists */}
                  {hotspotData && hotspotData.has_active_subscription && hotspotData.reference && (
                    <li className="list-group-item decoration-none">
                      <NavLink
                        className="d-flex align-items-center btn btn-link text-start w-100 p-0"
                        to={`/dashboard/payment/success/${hotspotData.reference}?reference=${hotspotData.reference}`}
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fas fa-globe text-info me-2"></i>
                        Internet
                      </NavLink>
                    </li>
                  )}

                  <li className="list-group-item decoration-none">
                    <button
                      className="d-flex align-items-center btn btn-link text-start w-100 p-0"
                      onClick={logout}
                      style={{ textDecoration: "none" }}
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