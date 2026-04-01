import Footer from "../components/footer";
import Header from "../components/header";
import Packages from "../components/packages";
import TermsTabs from "../components/TermsTabs";

export default function Landing() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <div className="xs-sidebar-group info-group">
          <div className="xs-overlay xs-bg-black" />
          <div className="xs-sidebar-widget">
            <div className="sidebar-widget-container">
              <div className="close-button">
                <span className="far fa-times fa-fw" />
              </div>
              <div className="sidebar-textwidget">
                {/* Sidebar Info Content */}
                <div className="sidebar-info-contents">
                  <div className="content-inner">
                    {/* Title Box */}
                    <div className="title-box">
                      <h5>
                        Broadband <span>connection</span>
                      </h5>
                      <div className="price">
                        $15 from free economy shipping
                      </div>
                    </div>
                    {/* Empty Cart Box */}
                    <div className="empty-cart-box">
                      {/* No Product */}
                      <div className="no-cart">
                        <span className="icon far fa-cart-plus fa-fw" />
                        No products in cart.
                      </div>
                    </div>
                    {/* Lower Box */}
                    <div className="lower-box">
                      <h5>
                        Popular <span>Suggestions</span>
                      </h5>
                      {/* Post Block */}
                      <div className="post-block">
                        <div className="inner-box">
                          <div className="image">
                            <img
                              src="images/resource/post-thumb-1.jpg"
                              alt=""
                            />
                          </div>
                          <h6>
                            <a href="#">Free Installation</a>
                          </h6>
                          <div className="rating">
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                          </div>
                          <div className="price-box">$125</div>
                          <a className="theme-btn bag-btn" href="#">
                            add to bag
                          </a>
                        </div>
                      </div>
                      {/* Post Block */}
                      <div className="post-block">
                        <div className="inner-box">
                          <div className="image">
                            <img
                              src="images/resource/post-thumb-2.jpg"
                              alt=""
                            />
                          </div>
                          <h6>
                            <a href="#">Ultra Fast Connect</a>
                          </h6>
                          <div className="rating">
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                          </div>
                          <div className="price-box">$205</div>
                          <a className="theme-btn bag-btn" href="#">
                            add to bag
                          </a>
                        </div>
                      </div>
                      {/* Post Block */}
                      <div className="post-block">
                        <div className="inner-box">
                          <div className="image">
                            <img
                              src="images/resource/post-thumb-3.jpg"
                              alt=""
                            />
                          </div>
                          <h6>
                            <a href="#">4K and 8K Quality</a>
                          </h6>
                          <div className="rating">
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                          </div>
                          <div className="price-box">$25</div>
                          <a className="theme-btn bag-btn" href="#">
                            add to bag
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slider One */}
        <section className="slider-one" id="home">
          <div
            className="swiper_carousel swiper-container"
            data-swiper='{"spaceBetween":0,"slidesPerView":1,"navigation":{"nextEl":".main-slider_button-next","prevEl":".main-slider_button-prev","clickable":"true"},"pagination":{"el":".main-slider_pagination","clickable":"true"},"autoplay":{"delay":"6000"},"breakpoints":{"320":{"slidesPerView":1,"spaceBetween":0},"480":{"slidesPerView":1,"spaceBetween":0},"640":{"slidesPerView":1,"spaceBetween":0}}}'
          >
            <div className="swiper-wrapper">
              {/* Slide */}
              <div className="swiper-slide">
                <div
                  className="slider-one_image"
                  style={{ backgroundImage: "url(images/main-slider/1.jpg)" }}
                />
                <div className="auto-container">
                  {/* Content Column */}
                  <div className="slider-one_content-column">
                    <div className="slider-one_content-inner">
                      <div className="slider-one_title">
                        Your Trusted Partner
                      </div>
                      <h1 className="slider-one_heading">
                        Unlimited Speed. Unlimited Possibilities.
                      </h1>
                      <div className="slider-one_text">
                        Stream, work, game, and connect without limits with
                        NovaNet Hotspot.
                      </div>
                      {/* Button Box */}
                      <div className="slider-one_button-box d-flex align-items-center flex-wrap">
                        <a className="btn-style-one theme-btn" href="/#price">
                          <div className="btn-wrap">
                            <span className="text-one">Discover More</span>
                            <span className="text-two">Discover More</span>
                          </div>
                        </a>
                        {/* Slider One Phone */}
                        <div className="slider-one_phone">
                          <div className="slider-one_phone-icon">
                            <i className="fa fa-phone" />
                          </div>
                          Give us a call <br />
                          <a href="tel:+233-54-283-3341">+233 (0)54 283 3341</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* other slides */}
            </div>
            {/* If we need pagination */}
            <div className="swiper-pagination" />
            {/* If we need navigation buttons */}
            <div className="main-slider_button-prev fas fa-arrow-left fa-fw" />
            <div className="main-slider_button-next fas fa-arrow-right fa-fw" />
          </div>
        </section>
        {/* End Slider One */}
       
        {/* About One */}
        <section className="about-one" id="about">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Image Column */}
              <div className="about-one_image-column col-lg-6 col-md-12 col-sm-12">
                <div className="about-one_image-outer">
                  <div
                    className="about-one_pattern"
                    style={{
                      backgroundImage: "url(images/background/pattern-1.png)",
                    }}
                  />
                  <div
                    className="about-one_image wow fadeInLeft"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <img src="images/resource/about-1.jpg" alt="" />
                    <div className="about-one_color-layer" />
                    <div className="about-one_color-layer-two" />
                  </div>
                  <div
                    className="about-one_image-two"
                    data-parallax='{"y" : 60}'
                  >
                    <img src="images/resource/about-2.jpg" alt="" />
                  </div>
                </div>
              </div>
              {/* Content Column */}
              <div className="about-one_content-column col-lg-6 col-md-12 col-sm-12 mt-5">
                <div className="about-one_content-outer">
                  <div className="sec-title">
                    <div className="sec-title_title tx-split-text split-in-right">
                      WHO WE ARE
                    </div>
                  </div>
                  <div className="about-one_bold-text">
                    NovaNet is a modern internet hotspot and billing solution
                    provider focused on delivering fast, stable, and secure
                    connectivity to our community. We combine smart network
                    technology with a seamless billing system to give users easy
                    access and full control of their data usage.
                  </div>
                  <div className="sec-title">
                    <div className="sec-title_title tx-split-text split-in-right">
                      OUR SERVICES
                    </div>
                  </div>
                  <ul className="about-one_lists">
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Secure Internet - Advanced network security and user
                      authentication to keep your connection safe.
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      High Speed Hotspot Access - Reliable and optimized WiFi
                      coverage for homes, shops, offices, and public spaces.
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Smart Billing System - Easy voucher generation, Mobile
                      money, online payments, usage tracking, and automated user
                      management.
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Stable Coverage - Strategic access point placement to
                      ensure strong and consistent signal strength.
                    </li>
                  </ul>
                  {/* Button Box */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End About One */}
        {/* Price One */}
        <Packages />

        {/* Benefit One */}
        <section
          id="benefits"
          className="benefit-one"
          style={{
            backgroundImage: "url(images/background/benefit-pattern.png)",
          }}
        >
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="left-box">
                  <div className="sec-title_title"> WHY CHOOSE NOVANET</div>
                  <ul className="about-one_lists">
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Fast and Stable Connection
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Affordable Data Packages
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Easy Login & Voucher Access
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      24/7 Network Monitoring
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" />
                      Community-Focused Service
                    </li>
                  </ul>
                </div>
                <div className="right-box">
                  <div className="sec-title_title"> OUR MISSION</div>
                  <div className="sec-title_text">
                    To provide reliable, affordable, and high-performance
                    internet access that empowers individuals and businesses to
                    thrive in the digital world.
                  </div>
                </div>
              </div>
            </div>
            <TermsTabs />
          </div>
        </section>
        {/* End Benefit One */}
        <Footer />
      </div>
      {/* Scroll To Top */}
      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fas fa-arrow-up fa-fw" />
      </div>
    </>
  );
}
