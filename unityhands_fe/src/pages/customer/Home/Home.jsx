import "./Home.css";
import { BsCart3 } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import { useState } from "react";


const Home = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Bàn gỗ sồi",
      category: "Bàn",
      price: 5000000,
      image: "../../../../items/ban_go_soi.jpg",
    },
    {
      id: 2,
      name: "Ghế gỗ cao cấp",
      category: "Ghế",
      price: 2000000,
      image: "../../../../items/ghe_go_cao_cap.jpg",
    },
    {
      id: 3,
      name: "Tủ quần áo gỗ",
      category: "Tủ",
      price: 8000000,
      image: "../../../../items/do_go_1.jpg",
    },
  ];
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  });

  const handleAddToCart = () => {
    const newCartCount = cartCount + 1;
    setCartCount(newCartCount);
    localStorage.setItem("cartCount", newCartCount);
    window.dispatchEvent(new Event("storage"));
  };
  
  const handleProductDetail = (id) => {
    navigate(`${PATH_NAME.PRODUCT_DETAILS.replace(":id", id)}`, { replace: true });
  };

  return (
    <div className="home">
      <section className="home-section-1">
        <div className="home-slider-text">
          <div className="home-container-1">
            <div className="home-row">
              <div className="home-col-left">
                <div className="home-heading-line-1">
                  <b>Nội thất</b> nâng tầm không gian sống
                </div>
                <div className="home-heading-line-2">
                  Khám phá nội thất thiết kế đương đại mang đến cảm giác thoải
                  mái, sang trọng. Cá nhân hoá trong từng sản phẩm phù hợp với
                  mọi không gian sống.
                </div>
                <Link to={PATH_NAME.ITEMS} className="home-btn-buy">
                  <BsCart3 /> Mua sắm ngay
                </Link>
              </div>
              <div className="home-col-right">
                <img
                  src="https://bizweb.dktcdn.net/100/501/740/themes/929449/assets/slider_text_image.png?1736415638335"
                  alt=""
                  className="home-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-2">
        <h3>Các sản phẩm nổi bật</h3>
        <div className="home-product-hot">
          {products.map((product) => (
            <div key={product.id} className="home-cart-product" onClick={()=>handleProductDetail(product.id)}>
              <div className="home-cart-img">
                <Link
                  to={PATH_NAME.PRODUCT_DETAILS}
                  className="home-cart-detail"
                >
                  <img
                    className="home-thumbnail"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              </div>

              <div className="home-cart-content">
                <div className="home-cart-label">
                {product.name}
                </div>
                <div className="home-cart-coin">{product.price.toLocaleString("vi-VN")}₫</div>
                <div className="home-cart-btn">
                  <button
                    className="home-add-cart"
                    type="submit"
                    onClick={handleAddToCart}
                  >
                    <BsCart3 className="home-icons" /> Thêm giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="home-read-more">
          <Link to={PATH_NAME.ITEMS}>Xem thêm</Link>
          <FaArrowRightLong className="home-icon-arrow" />
        </div>
      </section>

      <section className="home-section-3">
        <div className="home-banner-container">
          <a href="#">
            <span className="home-banner-title">NGUỒN CẢM HỨNG VÔ TẬN</span>
            <span className="home-banner-desc">
              Khám phá nội thất thiết kế đương đại mang đến cảm giác thoải mái,
              sang trọng. Cá nhân hoá trong từng sản phẩm phù hợp với mọi không
              gian sống.
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
