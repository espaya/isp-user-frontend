export default function Weekly60() {
  <div className="price-block_one">
    <div
      className="price-block_one-inner d-flex align-items-center flex-wrap"
      style={{
        backgroundImage: "url(images/background/pattern-3.png)",
      }}
    >
      <div className="price-block_one-title_box">
        <div className="price-block_one-title">Internet</div>
        <h3 className="price-block_one-heading">Weekly</h3>
        <div className="price-block_one-text">
          Choose from a range of fast, reliable Internet speeds to fit your
          needs
        </div>
      </div>
      <div className="icon-box">
        <i className="flaticon-web-development" />
        <i className="flaticon-world-grid" />
      </div>
      <ul className="price-block_one-list">
        <li>
          <i className="icon fa-solid fa-check fa-fw" />
          Turbo-Speed
        </li>
        <li>
          <i className="icon fa-solid fa-check fa-fw" />1 devices
        </li>
      </ul>
      <div className="price-block_one-price_box">
        <div className="price-block_one-price">
          <sub>¢</sub>60<sup>.00</sup>
          <span>/ Week</span>
        </div>
        {/* Button Box */}
        <div className="price-block_one-button">
          <a className="btn-style-one theme-btn" href="#">
            <div className="btn-wrap">
              <span className="text-one">Select</span>
              <span className="text-two">Select</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>;
}
