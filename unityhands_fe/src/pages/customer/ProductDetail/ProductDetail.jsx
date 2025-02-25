import { BsCart3 } from "react-icons/bs";
import "./ProductDetail.css";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { FaCarSide } from "react-icons/fa";

const ProductDetail = () => {
  return (
    <div className="product-detail">
      <h1>Thông tin chi tiết</h1>
      <div className="product-detail-container">
        <div className="product-detail-thumbnail">
          <img
            src="https://bizweb.dktcdn.net/100/501/740/products/anh-2.jpg?v=1699895641527"
            alt=""
            className="product-detail-img"
          />
        </div>
        <div className="product-detail-content">
          <div className="product-detail-top">
            <h2>Ghế da Armchair</h2>
            <p>
              <strong>Mã sản phẩm:</strong> VN123
            </p>
            <div className="product-detial-coin">10.000.000₫</div>
          </div>

          <div className="product-detail-middle">
            <p>
              <strong>Kích thước:</strong> 700x720x980mm
            </p>
            <p>
              <strong>Chất liệu:</strong>
              Gỗ tần bì tự nhiên, nệm bọc vải bố nhập khẩu cao cấp, mút D40 siêu
              đàn hồi.
            </p>
            <p>
              <strong>Bảo hành:</strong> 2 năm, bảo trì trọn đời.
            </p>
            <p>
              <strong>Số lượng:</strong> Còn hàng
            </p>
            <div className="product-detail-count">
              <CiCircleMinus className="product-detail-icons" />
              <p>1</p>
              <IoIosAddCircleOutline className="product-detail-icons" />
            </div>

            <button className="home-add-cart" type="submit">
              <BsCart3 className="home-icons" /> Thêm giỏ hàng
            </button>
          </div>

          <div className="product-detail-bottom">
            <h3>Quyền lợi & chính sách</h3>
            <div className="product-detail-text">
              <div className="product-detail-1">
                <MdOutlineSwapHorizontalCircle className="product-detail-icon-1" />{" "}
                7 ngày hoàn trả miễn phí
              </div>
              <div className="product-detail-1">
                <GoShieldCheck className="product-detail-icon-1" /> Bảo hành
                trong 12 tháng
              </div>
              <div className="product-detail-1">
                <FaCarSide className="product-detail-icon-1" /> Miễn phí vận
                chuyển
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
