import { useEffect, useState } from "react";
import fetchPackages from "../../controllers/FetchPackages";
import { Laptop, Smartphone, Tablet } from "lucide-react";

export default function DailyPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pagination, setPagination] = useState({});

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPackages(setLoading, setErrors, apiBase, setPackages, setPagination);
  }, []);

  const renderDeviceIcons = (count) => {

    const devices = Number(count) || 0;
    
    return (
      <>
        {Array.from({ length: devices }).map((_, i) => {
          if (i === 0)
            return <i key={i} className="flaticon-smartphone text-danger" />;

          if (i === 1)
            return <i key={i} className="flaticon-smartphone text-danger" />;

          return <i key={i} className="flaticon-smartphone text-danger" />;
        })}
      </>
    );
  };

  if (loading) {
    return <div className="text-center">Loading packages...</div>;
  }

  return (
    <>
      {packages?.map((pkg) => (
        <div className="price-block_one" key={pkg?.id}>
          <div
            className="price-block_one-inner d-flex align-items-center flex-wrap"
            style={{
              backgroundImage: "url(/images/background/pattern-3.png)",
            }}
          >
            {/* TITLE */}
            <div className="price-block_one-title_box">
              <div className="price-block_one-title">
                {pkg?.type?.toUpperCase()} Internet
              </div>

              <h3 className="price-block_one-heading">{pkg?.name}</h3>

              <div className="price-block_one-text">{pkg?.description}</div>
            </div>

            {/* ICON */}
            <div className="icon-box">
              <i className="flaticon-web-development" />
              {renderDeviceIcons(pkg?.devices)}
            </div>

            {/* FEATURES */}
            <ul className="price-block_one-list">
              <li>
                <i className="icon fa-solid fa-check" />
                {pkg?.speed} Mbps Speed
              </li>

              <li>
                <i className="icon fa-solid fa-check" />
                {pkg?.devices} Device
                {pkg?.devices > 1 && "s"}
              </li>

              <li>
                <i className="icon fa-solid fa-check" />
                {pkg?.dataLimit}
              </li>

              <li>
                <i className="icon fa-solid fa-check" />
                Valid for {pkg?.validity} Day
                {pkg?.validity > 1 && "s"}
              </li>
            </ul>

            {/* PRICE */}
            <div className="price-block_one-price_box">
              <div className="price-block_one-price">
                <sub>¢</sub>
                {pkg?.price}
                <sup>.00</sup>
                <span>/{pkg?.type}</span>
              </div>

              <div className="price-block_one-button">
                <button className="btn-style-one theme-btn">
                  <div className="btn-wrap">
                    <span className="text-one">Select</span>
                    <span className="text-two">Select</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
