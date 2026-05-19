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

                {/* Mobile Toggle Button */}
                <div
                  className="mobile-nav-toggler"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="icon">
                    <img src="/images/icons/menu.png" alt="" />
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

    </>
  );
}
