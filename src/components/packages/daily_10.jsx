import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

export default function Daily10() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const subscribe = (packageId) => {
    const param = packageId === 10 ? "daily_10" : "unknown";
    navigate(`/subscribe/${param}`);
  };

  return (
    <div className="price-block_one">
      <div
        className="price-block_one-inner d-flex align-items-center flex-wrap"
        style={{
          backgroundImage: "url(/images/background/pattern-3.png)",
        }}
      >
        <div className="price-block_one-title_box">
          <div className="price-block_one-title">Internet</div>
          <h3 className="price-block_one-heading">Daily</h3>
          <div className="price-block_one-text">
            Choose from a range of fast, reliable Internet speeds to fit your
            needs
          </div>
        </div>

        <div className="icon-box">
          <i className="flaticon-web-development" />
        </div>

        <ul className="price-block_one-list">
          <li>
            <i className="icon fa-solid fa-check fa-fw" />
            Turbo-Speed
          </li>
          <li>
            <i className="icon fa-solid fa-check fa-fw" />1 device
          </li>
        </ul>

        <div className="price-block_one-price_box">
          <div className="price-block_one-price">
            <sub>¢</sub>10<sup>.00</sup>
            <span>/ Day</span>
          </div>

          <div className="price-block_one-button">
            <button
              onClick={() => subscribe(10)}
              className="btn-style-one theme-btn"
              style={{ cursor: "pointer" }}
            >
              <div className="btn-wrap">
                <span className="text-one">Select</span>
                <span className="text-two">Select</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
