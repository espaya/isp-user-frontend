export default function Account() {
  return (
    <div className="dashboard-content">
      <div className="row clearfix">
        {/* LEFT: Profile Card */}
        {/* <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
          <div className="order-box text-center p-4 shadow-sm rounded">
            <img
              src="/images/avatar.png"
              alt="User Avatar"
              className="rounded-circle mb-3"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
            <h4>John Doe</h4>
            <p className="text-muted">john@example.com</p>
            <span className="badge bg-success mb-3">Active Subscriber</span>

            <ul className="order-totals mt-4 text-start">
              <li>
                <i className="fas fa-phone text-success me-2" />Phone
                <span className="float-end">+233 55 000 0000</span>
              </li>
              <li>
                <i className="fas fa-wifi text-primary me-2" /> Package
                <span className="float-end">Daily – ¢10</span>
              </li>
              <li>
                <i className="fas fa-calendar text-warning me-2" /> Expiry
                <span className="float-end">Today 11:59 PM</span>
              </li>
            </ul>
          </div>
        </div> */}

        {/* RIGHT: Personal Info / Security / Devices */}
        <div className="col-lg-8 col-md-12 col-sm-12">
          {/* PERSONAL INFO */}
          <div className="order-box mb-4 p-4 shadow-sm rounded">
            <h4>
              <i className="fas fa-user text-primary me-2" /> Personal
              Information
            </h4>

            <form className="shipping-form mt-3">
              <div className="row clearfix">
                <div className="col-lg-6 form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    defaultValue="John Doe"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    defaultValue="john@example.com"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 form-group">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    defaultValue="+233 55 000 0000"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 form-group">
                  <input
                    type="text"
                    placeholder="City"
                    defaultValue="Accra"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-12 form-group mt-3">
                  <button className="theme-btn btn-style-four w-100">
                    <i className="fas fa-save me-2" /> Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* SECURITY */}
          <div className="order-box mb-4 p-4 shadow-sm rounded">
            <h4>
              <i className="fas fa-lock text-danger me-2" /> Security
            </h4>

            <form className="shipping-form mt-3">
              <div className="row clearfix">
                <div className="col-lg-6 form-group">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-12 form-group mt-3">
                  <button className="theme-btn pay-btn w-100">
                    <i className="fas fa-key me-2" /> Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* CONNECTED DEVICES */}
          <div className="order-box p-4 shadow-sm rounded">
            <h4>
              <i className="fas fa-laptop text-info me-2" /> Connected Devices
            </h4>

            <ul className="order-totals mt-3">
              <li>
                <i className="fas fa-mobile-alt text-primary me-2" /> iPhone 13
                <span className="float-end">Active</span>
              </li>
              <li>
                <i className="fas fa-laptop text-secondary me-2" /> HP Laptop
                <span className="float-end">Active</span>
              </li>
            </ul>

            <button className="theme-btn btn-style-one w-100 mt-3">
              <i className="fas fa-sign-out-alt me-2" /> Disconnect All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
