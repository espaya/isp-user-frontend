import { useEffect, useState } from "react";
import fetchAccount from "../../controllers/FetchAccount";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Account() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const { success } = useParams();
  const [passLoading, setPassLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchAccount(apiBase, setErrors, setAccount, setLoading);
  }, []);

  useEffect(() => {
    if (account?.id) {
      setFormData((prev) => ({
        ...prev,
        name: account.name || "",
        email: account.email || "",
        phone: account.profile?.phone || "",
        address: account.profile?.address || "",
      }));
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/update-profile`, {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        return;
      }

      setAccount(data.user);

      Swal.fire({
        icon: "success",
        text: data.message,
        title: "Success",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setPassLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/update-password`, {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify({
          password: formData.newPassword,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const backendErrors = data.errors || {};

        setErrors({
          ...backendErrors,
          newPassword: backendErrors.password,
          confirmPassword: backendErrors.password_confirmation,
        });

        return;
      }

      Swal.fire({
        icon: "success",
        text: data.message,
        title: "Success",
      });

      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setPassLoading(false);
    }
  };

  const sections = [
    {
      title: "Personal Information",
      icon: "fas fa-user text-primary",
      fields: [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "phone", label: "Phone Number", type: "text" },
        { name: "address", label: "Address", type: "text" },
      ],
      button: { text: "Update Profile", icon: "fas fa-save" },
      onSubmit: handleProfileSubmit,
      disabled: loading,
    },
    {
      title: "Security",
      icon: "fas fa-lock text-danger",
      fields: [
        { name: "newPassword", label: "New Password", type: "password" },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
        },
      ],
      button: { text: "Change Password", icon: "fas fa-key" },
      onSubmit: handlePasswordSubmit,
      disabled: passLoading,
    },
  ];

  const devices = [
    {
      name: "iPhone 13",
      icon: "fas fa-mobile-alt text-primary",
      status: "Active",
    },
    {
      name: "HP Laptop",
      icon: "fas fa-laptop text-secondary",
      status: "Active",
    },
  ];

  return (
    <div className="dashboard-content">
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          {success && <p className="alert alert-info mb-4">{success}</p>}

          {sections.map((section, index) => (
            <div key={index} className="order-box mb-4 p-3 shadow-sm rounded">
              <h5>
                <i className={`${section.icon} me-2`} /> {section.title}
              </h5>

              <form method="POST" className="mt-3" onSubmit={section.onSubmit}>
                <div className="row g-2">
                  {section.fields.map((field, idx) => (
                    <div key={idx} className="col-lg-6 position-relative">
                      <input
                        type={
                          field.name === "newPassword"
                            ? showPasswords.newPassword
                              ? "text"
                              : "password"
                            : field.name === "confirmPassword"
                              ? showPasswords.confirmPassword
                                ? "text"
                                : "password"
                              : field.type
                        }
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        autoComplete="off"
                        disabled={section.disabled}
                      />

                      {/* 👁 Eye Toggle for Password Fields */}
                      {(field.name === "newPassword" ||
                        field.name === "confirmPassword") && (
                        <span
                          onClick={() => togglePassword(field.name)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "7px",
                            cursor: "pointer",
                            color: "#555",
                          }}
                        >
                          <i
                            className={`fas ${
                              showPasswords[field.name]
                                ? "fa-eye-slash"
                                : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      )}

                      {errors[field.name] && (
                        <small className="text-danger">
                          {errors[field.name][0]}
                        </small>
                      )}
                    </div>
                  ))}

                  <div className="col-12 mt-2">
                    <button
                      type="submit"
                      disabled={section.disabled}
                      className="btn btn-primary btn-sm w-100"
                    >
                      <i className={`${section.button.icon} me-1`} />
                      {section.disabled ? "Processing..." : section.button.text}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ))}

          {/* Connected Devices */}
          <div className="order-box p-3 shadow-sm rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                <i className="fas fa-laptop text-info me-2" /> Connected Devices
              </h5>

              <span className="badge bg-light text-dark border">
                {devices.length} Device{devices.length > 1 ? "s" : ""}
              </span>
            </div>

            <ul className="list-unstyled mb-3">
              {devices.map((device, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-between align-items-center p-2 mb-2 rounded border bg-white"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="me-2 d-flex justify-content-center align-items-center rounded-circle bg-light"
                      style={{ width: 35, height: 35 }}
                    >
                      <i className={`${device.icon}`} />
                    </div>

                    <div>
                      <strong className="d-block">{device.name}</strong>
                      <small className="text-muted">Last seen: Just now</small>
                    </div>
                  </div>

                  <span
                    className={`badge ${
                      device.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {device.status}
                  </span>
                </li>
              ))}
            </ul>

            <button className="btn btn-outline-danger btn-sm w-100 d-flex justify-content-center align-items-center gap-2">
              <i className="fas fa-sign-out-alt" /> Disconnect All Devices
            </button>

            <small className="text-muted d-block mt-2 text-center">
              Disconnecting devices will log you out everywhere.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
