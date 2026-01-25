import Daily10 from "./packages/daily_10";
import Daily15 from "./packages/daily_15";
import Monthly130 from "./packages/monthly_130";
import SpecialOffer from "./packages/special_offer";
import Weekly60 from "./packages/weekly_60";
import Weekly80 from "./packages/Weekly_80";

export default function Packages() {
  return (
    <>
      <section
        className="price-one"
        id="price"
        style={{ backgroundImage: "url(images/background/pattern-2.png)" }}
      >
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title centered">
            <div className="sec-title_title tx-split-text split-in-up">
              PACKAGES
            </div>
            <h2 className="sec-title_heading tx-split-text split-in-up">
              Choose Our Package Plans
            </h2>
          </div>
          <Daily10 />
          <Daily15 />
          <Weekly60 />
          <Weekly80 />
          <Monthly130 />
          <SpecialOffer />
        </div>
      </section>
    </>
  );
}
