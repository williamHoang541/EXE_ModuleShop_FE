import "./Home.css";
import { BsCart3 } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {

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
                <a href="#" className="home-btn-buy">
                  <BsCart3 /> Mua sắm ngay
                </a>
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
          <form className="home-cart-product">
            <div className="home-cart-img">
              <a href="#" className="home-cart-detail">
                <img
                  className="home-thumbnail"
                  src="https://bizweb.dktcdn.net/thumb/large/100/501/740/products/2-d053f572-d9ac-46c3-8505-6b5b9b783e83.jpg?v=1701329060077"
                  alt=""
                />
              </a>
            </div>

            <div className="home-cart-content">
              <div className="home-cart-label">Tủ quần áo 5 cánh hiện đại</div>
              <div className="home-cart-coin">10.000.000₫</div>
              <div className="home-cart-btn">
                <button className="home-add-cart" type="submit">
                  <BsCart3 className="home-icons" /> Thêm giỏ hàng
                </button>
              </div>
            </div>
          </form>

          <form className="home-cart-product">
            <div className="home-cart-img">
              <a href="#" className="home-cart-detail">
                <img
                  className="home-thumbnail"
                  src="https://bizweb.dktcdn.net/thumb/large/100/501/740/products/2-d053f572-d9ac-46c3-8505-6b5b9b783e83.jpg?v=1701329060077"
                  alt=""
                />
              </a>
            </div>

            <div className="home-cart-content">
              <div className="home-cart-label">Tủ quần áo 5 cánh hiện đại</div>
              <div className="home-cart-coin">10.000.000₫</div>
              <div className="home-cart-btn">
                <button className="home-add-cart" type="submit">
                  <BsCart3 className="home-icons" /> Thêm giỏ hàng
                </button>
              </div>
            </div>
          </form>

          <form className="home-cart-product">
            <div className="home-cart-img">
              <a href="#" className="home-cart-detail">
                <img
                  className="home-thumbnail"
                  src="https://bizweb.dktcdn.net/thumb/large/100/501/740/products/2-d053f572-d9ac-46c3-8505-6b5b9b783e83.jpg?v=1701329060077"
                  alt=""
                />
              </a>
            </div>

            <div className="home-cart-content">
              <div className="home-cart-label">Tủ quần áo 5 cánh hiện đại</div>
              <div className="home-cart-coin">10.000.000₫</div>
              <div className="home-cart-btn">
                <button className="home-add-cart" type="submit">
                  <BsCart3 className="home-icons" /> Thêm giỏ hàng
                </button>
              </div>
            </div>
          </form>

          <form className="home-cart-product">
            <div className="home-cart-img">
              <a href="#" className="home-cart-detail">
                <img
                  className="home-thumbnail"
                  src="https://bizweb.dktcdn.net/thumb/large/100/501/740/products/2-d053f572-d9ac-46c3-8505-6b5b9b783e83.jpg?v=1701329060077"
                  alt=""
                />
              </a>
            </div>

            <div className="home-cart-content">
              <div className="home-cart-label">Tủ quần áo 5 cánh hiện đại</div>
              <div className="home-cart-coin">10.000.000₫</div>
              <div className="home-cart-btn">
                <button className="home-add-cart" type="submit">
                  <BsCart3 className="home-icons" /> Thêm giỏ hàng
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="home-read-more">
          <a href="#">Xem thêm</a>
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
