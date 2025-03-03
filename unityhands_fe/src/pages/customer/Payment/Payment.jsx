import "./Payment.css";
import useTitle from "../../../constant/useTitle";
import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import axios from "axios";

const Payment = () => {
  useTitle("Thanh toán");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [shippingFee, setShippingFee] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
    paymentMethod: "bank",
  });

  // Lấy danh sách tỉnh/thành phố từ API khi component mount
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Lỗi lấy tỉnh/thành:", error));
  }, []);

  // Khi chọn tỉnh/thành phố → Lấy danh sách quận/huyện
  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setFormData({
      ...formData,
      province: provinceCode,
      district: "",
      ward: "",
    });
    setWards([]); // Xóa danh sách phường khi đổi tỉnh
    setShippingFee(null); //Reset phí khi đổi tỉnh

    if (provinceCode) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((response) => setDistricts(response.data.districts))
        .catch((error) => console.error("Lỗi lấy quận/huyện:", error));

        setShippingFee(30000 + Math.floor(Math.random() * 20000)); // Phí ngẫu nhiên từ 30k - 50k
    } else {
      setDistricts([]);
    }
  };

   // Khi chọn quận/huyện → Lấy danh sách phường/xã
   const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setFormData({ ...formData, district: districtCode, ward: "" });

    if (districtCode) {
      axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then(response => setWards(response.data.wards))
        .catch(error => console.error("Lỗi lấy phường/xã:", error));
    } else {
      setWards([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {/* Cột 1: Thông tin mua hàng */}
        <div className="checkout-left">
          <h3>Thông tin mua hàng</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại (tùy chọn)"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ (tùy chọn)"
            onChange={handleChange}
          />

           <select name="province" onChange={handleProvinceChange}>
            <option value="">Chọn tỉnh/thành</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>

          <select name="district" onChange={handleDistrictChange} disabled={!formData.province}>
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>

          <select name="ward" onChange={handleChange} disabled={!formData.district}>
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>

          <textarea
            name="note"
            placeholder="Ghi chú (tùy chọn)"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Cột 2: Vận chuyển và Thanh toán */}
        <div className="checkout-middle">
          <h3>Vận chuyển</h3>
          {formData.province ? (
            <p className="shipping-fee">Phí vận chuyển: <strong>{shippingFee ? `${shippingFee.toLocaleString()}₫` : "Đang tính..."}</strong></p>
          ) : (
            <p className="shipping-info">Vui lòng nhập thông tin giao hàng</p>
          )}
          <div className="checkout-payment">
            <h3>Thanh toán</h3>
            <div className="checkout-payment-radio">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === "bank"}
                  onChange={handleChange}
                />
                Chuyển khoản
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Thu hộ (COD)
              </label>
            </div>
          </div>
        </div>

        {/* Cột 3: Đơn hàng */}
        <div className="checkout-right">
          <h3>Đơn hàng (2 sản phẩm)</h3>
          <div className="order-item">
            <div className="order-item-product">
              <div className="order-item-img">
                <img
                  src="https://bizweb.dktcdn.net/100/501/740/products/1-a2ce9601-2b45-4ed0-b64e-e27e38bf817d.jpg?v=1701328440557"
                  alt=""
                />
                <div className="order-item-quantity">1</div>
              </div>

              <p>Tủ Quần Áo Đa Năng</p>
            </div>

            <span>9.500.000₫</span>
          </div>
          <div className="order-item-sale">
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button className="apply-btn">Áp dụng</button>
          </div>

          <div className="order-summary">
            <p>
              Tạm tính: <span>42.550.000₫</span>
            </p>
            <p>
              Phí vận chuyển: <span>-</span>
            </p>
            <p className="total">
              Tổng cộng: <strong>42.550.000₫</strong>
            </p>
          </div>
          <div className="order-item-back">
            <div className="order-item-back-link">
              <MdArrowBackIos className="order-icon-arrow" />
              <Link to={PATH_NAME.SHOPPING_CARTS}>Quay lại giỏ hàng</Link>
            </div>
            <button className="order-btn">ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
