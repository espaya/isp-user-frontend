import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="main-header header-style-one">
        <div className="header-lower">
          <div className="auto-container">
            <div className="inner-container d-flex align-items-center justify-content-between">
              {/* Logo Box */}
              <div className="logo-box d-flex align-items-center">
                <div className="logo">
                  <Link to="/">
                    <img
                      width="18%"
                      height="18%"
                      src="/images/logo.png"
                      alt=""
                    />
                  </Link>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="nav-outer d-flex align-items-center">
                <nav className="main-menu show navbar-expand-md">
                  <div
                    className="navbar-collapse scroll-nav collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li>
                        <NavLink to="/#home">Home</NavLink>
                      </li>
                      <li>
                        <NavLink to="/#about">About us</NavLink>
                      </li>
                      <li>
                        <NavLink to="/#price">Price</NavLink>
                      </li>
                      <li>
                        <NavLink to="/#benefits">Benefits</NavLink>
                      </li>
                      <li>
                        {user ? (
                          <NavLink to="/dashboard">Dashboard</NavLink>
                        ) : (
                          <NavLink to="/login">Login / Register</NavLink>
                        )}
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Right Side */}
              <div className="outer-box d-flex align-items-center">
                <div className="header-phone_box">
                  <div className="header-phone_box-inner">
                    <div className="header-phone_box-icon flaticon-consulting" />
                    Help line <br />
                    <a href="tel:+233542833341">+233542833341</a>
                  </div>
                </div>

                {/* ✅ Mobile Toggle Button - LARGER and more visible */}
                <div
                  className="mobile-nav-toggler"
                  onClick={() => setMobileMenuOpen(true)}
                  style={{
                    cursor: "pointer",
                    display: "block",
                    padding: "8px",
                    minWidth: "44px",
                    minHeight: "44px",
                  }}
                >
                  <span className="icon">
                    <img
                      src="/images/icons/menu.png"
                      alt="Menu"
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "block",
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="mobile-menu-backdrop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="mobile-menu-panel">
              <div
                className="close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="icon far fa-times fa-fw">✕</span>
              </div>
              <div className="nav-logo">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/images/logo.png" alt="" />
                </Link>
              </div>
              <div className="menu-outer">
                <ul className="navigation">
                  <li>
                    <NavLink
                      to="/#home"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/#about"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/#price"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Price
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/#benefits"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Benefits
                    </NavLink>
                  </li>
                  <li>
                    {user ? (
                      <NavLink
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login / Register
                      </NavLink>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </header>

      {/* ✅ Add CSS to ensure mobile menu works properly */}
      <style>
        {`
          /* Mobile Toggle Button - Desktop hide */
          @media only screen and (min-width: 992px) {
            .mobile-nav-toggler {
              display: none !important;
            }
          }

          /* Mobile Toggle Button - Mobile show with proper size */
          @media only screen and (max-width: 991px) {
            .mobile-nav-toggler {
              display: block !important;
              padding: 8px !important;
            }
            .mobile-nav-toggler .icon img {
              width: 28px !important;
              height: 28px !important;
            }
          }

          /* Mobile Menu Styles */
          .mobile-menu-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 99998;
            animation: fadeIn 0.3s ease;
          }

          .mobile-menu-panel {
            position: fixed;
            top: 0;
            right: 0;
            width: 85%;
            max-width: 320px;
            height: 100%;
            background: #ffffff;
            z-index: 99999;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .close-btn {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            z-index: 10;
          }

          .nav-logo {
            padding: 30px 20px;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
            text-align: center;
          }

          .nav-logo img {
            max-width: 150px;
          }

          .menu-outer {
            padding: 0 20px;
          }

          .menu-outer .navigation {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .menu-outer .navigation li {
            margin-bottom: 15px;
          }

          .menu-outer .navigation li a {
            color: #333;
            text-decoration: none;
            font-size: 18px;
            display: block;
            padding: 10px 0;
            transition: color 0.3s;
          }

          .menu-outer .navigation li a:hover,
          .menu-outer .navigation li a.active {
            color: #007bff;
          }
        `}
      </style>
    </>
  );
}
