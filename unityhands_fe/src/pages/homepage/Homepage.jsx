import React from "react";
import "./Homepage.css";
import { Button, ConfigProvider, Divider, Image, notification } from "antd";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Homepage() {
  const handleClick = () => {
    notification.warning({
      message: "Thông báo",
      description: "Bạn cần phải đăng nhập trước",
      placement: "topRight",
      duration: 3, // Thời gian thông báo tồn tại
    });
  };

  const sliderData = [
    "../../../public/items/do_go_1.jpg",
    "../../../public/items/do_go_2.jpg",
    "../../../public/items/do_go_3.jpg",
    "../../../public/items/do_go_4.jpg",
    "../../../public/items/do_go_5.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                dots: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: false,
            },
        },
    ],
};

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="homepage">
        <div className="hero">
          <img
            src="https://dogoducthien.vn/upload/photos/41210/resize_w500_hauto_01.-khay-tra-623006dd6f7b3.jpg"
            alt="module_furniture_shop"
            className="hero__img"
          />
          <div className="hero__overlay-text">Module Furniture Shop</div>
          <div className="hero__button">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultColor: "white",
                    defaultBg: "#936a49",
                    defaultBorderColor: "#936a49",
                    defaultHoverBorderColor: "#43321b",
                    defaultHoverColor: "white",
                    defaultHoverBg: "#43321b",
                    defaultActiveBg: "#936a49",
                    defaultActiveBorderColor: "#936a49",
                    defaultActiveColor: "black",
                  },
                },
              }}
            >
              <Button className="hero__button__buttons" onClick={handleClick}>
                Đặt hàng ngay
              </Button>
            </ConfigProvider>
          </div>
        </div>

        <div className="swiper">
          <p className="swiper__title">Sản phẩm</p>
          <div style={{ width: "10%", margin: "0 auto" }}>
            <Divider className="custom-horizontal-divider" />
          </div>
          <p className="swiper__content">
            Với Module Furniture Shop,
            <br /> bạn sẽ tận hưởng được các sản phẩm làm từ gỗ chất lượng, cao cấp nhất
          </p>
          <div className="image-grid">
          <Slider {...settings} aria-label="grid-image">
                {sliderData.map((img, index) => (
                    <div className="grid-item" key={index}>
                        <img src={img} alt={`Furniture item ${index}`} />
                    </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Homepage;
