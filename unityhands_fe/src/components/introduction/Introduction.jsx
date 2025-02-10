import { Slider } from "antd";
import "./Introduction.scss";

function Introduction() {
  const sliderData = [
    {
      href: "",
      imgSrc:
        "https://dogoducthien.vn/upload/photos/41210/resize_w500_hauto_01.-khay-tra-623006dd6f7b3.jpg",
      imgAlt: "san_pham_1",
    },
    {
      href: "",
      imgSrc:
        "https://dogonguyenvinh.vn/wp-content/uploads/2021/09/z2927361131076_24bd9b448f8d6768439a15f37a14ac18-e1636685903299.jpg",
      imgAlt: "san_pham_2",
    },
    {
      href: "",
      imgSrc:
        "https://dogoducthien.vn/upload/photos/41210/resize_w500_hauto_01.-khay-tra-623006dd6f7b3.jpg",
      imgAlt: "san_pham_3",
    },
    {
      href: "",
      imgSrc:
        "https://dogonguyenvinh.vn/wp-content/uploads/2021/09/z2927361131076_24bd9b448f8d6768439a15f37a14ac18-e1636685903299.jpg",
      imgAlt: "san_pham_4",
    },
    {
      href: "",
      imgSrc: "https://dogonguyenvinh.vn/wp-content/uploads/2021/09/z2927361131076_24bd9b448f8d6768439a15f37a14ac18-e1636685903299.jpg",
      imgAlt: "san_pham_5",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
          dots: true,
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
    <div className="carousel-container">
      <Slider {...settings} aria-label="Image Carousel">
        {sliderData.map((item, index) => (
          <div className="carousel-item" key={index}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <img src={item.imgSrc} alt={item.imgAlt} />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Introduction;
