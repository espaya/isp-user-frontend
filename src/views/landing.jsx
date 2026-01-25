import Footer from "../components/footer";
import Header from "../components/header";
import Packages from "../components/packages";

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
                        Ultra Fast internet Entertainment
                      </h1>
                      <div className="slider-one_text">
                        Can consent to the use of such technologies byclosing
                        this notice <br /> senectus amet sodales habitant
                        dapibus
                      </div>
                      {/* Button Box */}
                      <div className="slider-one_button-box d-flex align-items-center flex-wrap">
                        <a
                          className="btn-style-one theme-btn"
                          href="about.html"
                        >
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
                          <a href="tel:+123-4567-890">+123 (4567) 890</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                        Ultra Fast internet Entertainment
                      </h1>
                      <div className="slider-one_text">
                        Can consent to the use of such technologies byclosing
                        this notice <br /> senectus amet sodales habitant
                        dapibus
                      </div>
                      {/* Button Box */}
                      <div className="slider-one_button-box d-flex align-items-center flex-wrap">
                        <a
                          className="btn-style-one theme-btn"
                          href="about.html"
                        >
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
                          <a href="tel:+123-4567-890">+123 (4567) 890</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                        Ultra Fast internet Entertainment
                      </h1>
                      <div className="slider-one_text">
                        Can consent to the use of such technologies byclosing
                        this notice <br /> senectus amet sodales habitant
                        dapibus
                      </div>
                      {/* Button Box */}
                      <div className="slider-one_button-box d-flex align-items-center flex-wrap">
                        <a
                          className="btn-style-one theme-btn"
                          href="about.html"
                        >
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
                          <a href="tel:+123-4567-890">+123 (4567) 890</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* If we need pagination */}
            <div className="swiper-pagination" />
            {/* If we need navigation buttons */}
            <div className="main-slider_button-prev fas fa-arrow-left fa-fw" />
            <div className="main-slider_button-next fas fa-arrow-right fa-fw" />
          </div>
        </section>
        {/* End Slider One */}
        {/* Service One */}
        <section className="service-one">
          <div className="auto-container">
            <div className="row g-0">
              {/* Service Block One */}
              <div className="service-block_one col-lg-4 col-md-6 col-sm-12">
                <div className="service-block_one-inner">
                  <div className="service-block_one-upper">
                    <div className="service-block_one-icon flaticon-wifi-router-1" />
                    <h4 className="service-block_one-heading">
                      <a href="service-detail.html">
                        Fiber <br /> Broadband
                      </a>
                    </h4>
                  </div>
                  <div className="service-block_one-text">
                    Many desktop Wifi packages &amp; web page editors now use
                    Ipsum budgets dipiscing{" "}
                  </div>
                </div>
              </div>
              {/* Service Block One */}
              <div className="service-block_one col-lg-4 col-md-6 col-sm-12">
                <div className="service-block_one-inner">
                  <div className="service-block_one-upper">
                    <div className="service-block_one-icon flaticon-smartphone" />
                    <h4 className="service-block_one-heading">
                      <a href="service-detail.html">
                        All For <br /> Mobiles Conatct
                      </a>
                    </h4>
                  </div>
                  <div className="service-block_one-text">
                    Many desktop Wifi packages &amp; web page editors now use
                    Ipsum budgets dipiscing{" "}
                  </div>
                </div>
              </div>
              {/* Service Block One */}
              <div className="service-block_one col-lg-4 col-md-6 col-sm-12">
                <div className="service-block_one-inner">
                  <div className="service-block_one-upper">
                    <div className="service-block_one-icon flaticon-cinema" />
                    <h4 className="service-block_one-heading">
                      <a href="service-detail.html">
                        TV and <br /> Streeming
                      </a>
                    </h4>
                  </div>
                  <div className="service-block_one-text">
                    Many desktop Wifi packages &amp; web page editors now use
                    Ipsum budgets dipiscing{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Service One */}
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
              <div className="about-one_content-column col-lg-6 col-md-12 col-sm-12">
                <div className="about-one_content-outer">
                  <div className="sec-title">
                    <div className="sec-title_title tx-split-text split-in-right">
                      WHO WE ARE
                    </div>
                    <h2 className="sec-title_heading tx-split-text split-in-right">
                      Get fast internet service <br /> with your TV service
                    </h2>
                  </div>
                  <div className="about-one_bold-text">
                    Phasellus non cursus ligula, sed mattis urna. Aenean ac tor
                    gravida, volutpat quam eget, consequat elit.
                  </div>
                  <div className="about-one_feature">
                    <div className="about-one_feature-icon flaticon-cyber-security" />
                    <strong>Secure internet</strong>
                    Risus commodo viverra maecenas accumsan lacus vel metus erat
                    facilisis.
                  </div>
                  <ul className="about-one_lists">
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" /> Internet
                      &amp; TV service solutions
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" /> Top
                      quality services with reasonable price
                    </li>
                    <li>
                      <i className="arrow fa fa-arrow-circle-right" /> Live
                      sports and TV shows with ultra fast speed
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
                  <div className="sec-title_title">OUR BENEFITS</div>
                  <h2 className="sec-title_heading">
                    A few great reasons make <br /> you choice usbr
                  </h2>
                </div>
                <div className="right-box">
                  <div className="sec-title_text">
                    Business is the activity of making one's living or making
                    money by producing cumsociis natoque penatibus et magnis dis
                    partu rient to montes. Aene an massa. cumsociis natoque
                    penatibus.
                  </div>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              {/* Benefit Block One */}
              <div className="benefit-block_one col-lg-3 col-md-6 col-sm-6">
                <div className="benefit-block_one-inner">
                  <div
                    className="benefit-block_one-pattern"
                    style={{
                      backgroundImage:
                        "url(images/background/benefit-block_pattern.png)",
                    }}
                  />
                  <div className="benefit-block_one-color" />
                  <div className="benefit-block_one-icon flaticon-installation" />
                  <h4 className="benefit-block_one-heading">
                    <a href="service-detail.html">
                      Free <br /> Installation
                    </a>
                  </h4>
                </div>
              </div>
              {/* Benefit Block One */}
              <div className="benefit-block_one col-lg-3 col-md-6 col-sm-6">
                <div className="benefit-block_one-inner">
                  <div
                    className="benefit-block_one-pattern"
                    style={{
                      backgroundImage:
                        "url(images/background/benefit-block_pattern.png)",
                    }}
                  />
                  <div className="benefit-block_one-color" />
                  <div className="benefit-block_one-icon flaticon-high-speed" />
                  <h4 className="benefit-block_one-heading">
                    <a href="service-detail.html">
                      Ultra Fast <br /> Connect
                    </a>
                  </h4>
                </div>
              </div>
              {/* Benefit Block One */}
              <div className="benefit-block_one col-lg-3 col-md-6 col-sm-6">
                <div className="benefit-block_one-inner">
                  <div
                    className="benefit-block_one-pattern"
                    style={{
                      backgroundImage:
                        "url(images/background/benefit-block_pattern.png)",
                    }}
                  />
                  <div className="benefit-block_one-color" />
                  <div className="benefit-block_one-icon flaticon-smart-tv" />
                  <h4 className="benefit-block_one-heading">
                    <a href="service-detail.html">
                      4K and <br /> 8K Quality
                    </a>
                  </h4>
                </div>
              </div>
              {/* Benefit Block One */}
              <div className="benefit-block_one col-lg-3 col-md-6 col-sm-6">
                <div className="benefit-block_one-inner">
                  <div
                    className="benefit-block_one-pattern"
                    style={{
                      backgroundImage:
                        "url(images/background/benefit-block_pattern.png)",
                    }}
                  />
                  <div className="benefit-block_one-color" />
                  <div className="benefit-block_one-icon flaticon-technical-support" />
                  <h4 className="benefit-block_one-heading">
                    <a href="service-detail.html">
                      Great Fast <br /> Support 24/7
                    </a>
                  </h4>
                </div>
              </div>
            </div>
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
