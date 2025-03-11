import "./Payment.css";
import useTitle from "../../../constant/useTitle";
import { useContext, useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constant/config";
import qr from "/items/ngan_hang.jpg";

const Payment = () => {
  useTitle("Thanh toán");
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
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

  // Lấy dữ liệu giỏ hàng từ localStorage khi vào trang
  useEffect(() => {
    const storedCart = localStorage.getItem("cartData");
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

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
    const selectedProvince = provinces.find((p) => p.code == provinceCode);
    setFormData({
      ...formData,
      province: provinceCode,
      provinceName: selectedProvince ? selectedProvince.name : "",
      district: "",
      districtName: "",
      ward: "",
      wardName: "",
    });
    setDistricts([]);
    setWards([]); // Xóa danh sách phường khi đổi tỉnh
    setShippingFee(null); //Reset phí khi đổi tỉnh

    if (provinceCode) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((response) => setDistricts(response.data.districts))
        .catch((error) => console.error("Lỗi lấy quận/huyện:", error));

      setShippingFee(30000); // Phí ngẫu nhiên từ 30k - 50k
    } else {
      setDistricts([]);
    }
  };

  // Khi chọn quận/huyện → Lấy danh sách phường/xã
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    const selectedDistrict = districts.find((d) => d.code == districtCode);
    setFormData({
      ...formData,
      district: districtCode,
      districtName: selectedDistrict ? selectedDistrict.name : "",
      ward: "",
      wardName: "",
    });

    if (districtCode) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then((response) => setWards(response.data.wards))
        .catch((error) => console.error("Lỗi lấy phường/xã:", error));
    } else {
      setWards([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ward") {
      const selectedWard = wards.find((w) => w.code == value);
      setFormData({
        ...formData,
        ward: value,
        wardName: selectedWard ? selectedWard.name : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOrder = async () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      return;
    }

    // Định dạng dữ liệu gửi API
    const orderData = {
      accountId: userId,
      shippingAddress: `${formData.address}, ${formData.wardName}, ${formData.districtName}, ${formData.provinceName}`,
      paymentMethod: formData.paymentMethod,
      notes: formData.note,
      deliveryInfo: `Email: ${formData.email}, Họ tên: ${formData.name}, SĐT: ${formData.phone}`,
    };

    console.log("Dữ liệu gửi lên API:", orderData);
    try {
      const response = await axios.post(`${BASE_URL}Order/create`, orderData);
      if (response.status === 200) {
        toast.success("Đặt hàng thành công!");

        // Xóa giỏ hàng sau khi đặt hàng
        localStorage.removeItem("cartData");
        localStorage.setItem("cartCount", "0");
        window.dispatchEvent(new Event("storage"));

        // Chuyển hướng về trang đơn hàng
        navigate(PATH_NAME.HOME);
        const orderId = response.data.id;

        // Fetch the checkout URL
        const checkoutResponse = await axios.post(`${BASE_URL}Payment/${orderId}/checkout`);
        const checkoutUrl = checkoutResponse.data.checkoutUrl;

        if (checkoutUrl) {
          // Redirect to the checkout URL
          window.location.href = checkoutUrl;
        } else {
          toast.error("Không thể lấy URL thanh toán, vui lòng thử lại!");
        }
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Đặt hàng thất bại, vui lòng thử lại!");
    }
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

          <select
            name="district"
            onChange={handleDistrictChange}
            disabled={!formData.province}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>

          <select
            name="ward"
            onChange={handleChange}
            disabled={!formData.district}
          >
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
            <p className="shipping-fee">
              Phí vận chuyển:{" "}
              <strong>
                {shippingFee
                  ? `${shippingFee.toLocaleString()}₫`
                  : "Đang tính..."}
              </strong>
            </p>
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
                  value="online payment"
                  checked={formData.paymentMethod === "online payment"}
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

            {formData.paymentMethod === "online payment" && (
              <div className="qr-code-container">
                <p>Quét mã QR để thanh toán:</p>
                <img src={qr} alt="QR Code" className="qr-code-img" />
                <div className="qr-text">
                  <p>
                    <strong>Ngân hàng:</strong>TP Bank
                  </p>
                  <p>
                    <strong>Số tài khoản:</strong>0718 3995 901
                  </p>
                  <p>
                    <strong>Chủ tài khoản:</strong> Tăng Dư Yến
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cột 3: Đơn hàng */}
        <div className="checkout-right">
          <h3>Đơn hàng ({cartData.length} sản phẩm)</h3>
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div className="order-item" key={item.productId}>
                <div className="order-item-product">
                  <div className="order-item-img">
                    <img
                      src={item.product?.productImages?.$values[0]?.imageUrl}
                      alt={item.product?.name}
                    />
                    <div className="order-item-quantity">{item.quantity}</div>
                  </div>

                  <p>{item.product?.name}</p>
                </div>

                <span>{item.product?.price?.toLocaleString()}₫</span>
              </div>
            ))
          ) : (
            <p>Giỏ hàng trống</p>
          )}

          <div className="order-item-sale">
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button className="apply-btn">Áp dụng</button>
          </div>
          <div className="order-summary">
            <p>
              Tạm tính:
              <span>
                {cartData
                  .reduce(
                    (total, item) =>
                      total + item.product?.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
                ₫
              </span>
            </p>
            <p>
              Phí vận chuyển:
              <span>
                {shippingFee ? `${shippingFee.toLocaleString()}₫` : "-"}
              </span>
            </p>
            <p className="total">
              Tổng cộng:
              <strong>
                {(
                  cartData.reduce(
                    (total, item) =>
                      total + item.product?.price * item.quantity,
                    0
                  ) + (shippingFee || 0)
                ).toLocaleString()}
                ₫
              </strong>
            </p>
          </div>
          <div className="order-item-back">
            <div className="order-item-back-link">
              <MdArrowBackIos className="order-icon-arrow" />
              <Link to={PATH_NAME.SHOPPING_CARTS}>Quay lại giỏ hàng</Link>
            </div>
            <button className="order-btn" onClick={handleOrder}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
