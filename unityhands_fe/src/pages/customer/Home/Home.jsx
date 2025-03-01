import "./Home.css";
import { BsCart3 } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../../constant/config";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  });

  const productApi =
    `${BASE_URL}Product/get-all?PageNumber=1&PageSize=3`;
  const imageApi =
    `${BASE_URL}ProductImage/get-all`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, imageRes] = await Promise.all([
          axios.get(productApi),
          axios.get(imageApi),
        ]);

        if (productRes.data?.$values) {
          setProducts(productRes.data.$values);
        }
        if (imageRes.data?.$values) {
          setImages(imageRes.data.$values);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = () => {
    const newCartCount = cartCount + 1;
    setCartCount(newCartCount);
    localStorage.setItem("cartCount", newCartCount);
    window.dispatchEvent(new Event("storage"));

    toast.dismiss();
    toast.success("Đã thêm vào giỏ hàng");
  };

  if (loading) return <div className="loader"></div>;

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
          {products.map((product) => {
            const productImage = images.find(
              (image) => image.productId === product.id && image.isPrimary
            );
            return (
              <div key={product.id} className="home-cart-product">
                <div className="home-cart-img">
                  <Link
                    to={PATH_NAME.PRODUCT_DETAILS.replace(":id", product.id)}
                    className="home-cart-detail"
                  >
                    <img
                      className="home-thumbnail"
                      src={productImage.imageUrl}
                      alt={product.name}
                    />
                  </Link>
                </div>

                <div className="home-cart-content">
                  <div className="home-cart-label">{product.name}</div>
                  <div className="home-cart-coin">
                    {product.price.toLocaleString("vi-VN")}₫
                  </div>
                  <div className="home-cart-btn">
                    <button
                      className="home-add-cart"
                      type="submit"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
                        handleAddToCart();
                      }}
                    >
                      <BsCart3 className="home-icons" /> Thêm giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
