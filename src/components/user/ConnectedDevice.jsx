import { useEffect, useState } from "react";

export default function ConnectedDevice() {
  const apiBase = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const res = await fetch(`${apiBase}/api/user/connected-devices`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setDevices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectAll = async () => {
    await fetch(`${apiBase}/api/user/disconnect-devices`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    fetchDevices();
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="order-box p-3 shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          <i className="fas fa-laptop text-info me-2" /> Connected Devices
        </h5>

        <span className="badge bg-light text-dark border">
          {devices.length} Device{devices.length > 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-3">Loading devices...</div>
      ) : devices.length === 0 ? (
        <div className="text-center text-muted py-3">No active sessions</div>
      ) : (
        <ul className="list-unstyled mb-3">
          {devices.map((device, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center p-2 mb-2 rounded border bg-white"
            >
              <div>
                <strong className="d-block">{device.ip}</strong>
                <small className="text-muted">
                  MAC: {device.mac} • Uptime: {device.uptime}
                </small>
              </div>

              <span className="badge bg-success">Active</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={disconnectAll}
        disabled={devices.length === 0}
        className="btn btn-outline-danger btn-sm w-100"
      >
        <i className="fas fa-sign-out-alt me-2" />
        Disconnect All Devices
      </button>
    </div>
  );
}
