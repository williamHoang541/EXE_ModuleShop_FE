import axios from "axios";
import { PATH_NAME } from "../../../constant/pathname";
import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../../../constant/useTitle";
import { BASE_URL } from "../../../constant/config";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useTitle("Quên mật khẩu");

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Xử lý khi bấm "Tiếp tục"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form submit mặc định

    if (!email) {
      toast.error("Vui lòng nhập email.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    try {
      const response =await axios.post(`${BASE_URL}Account/forgot-password?email=${encodeURIComponent(email)}`);
      console.log("API Response:", response); 

      if (response.status === 200) {
        toast.success("Mã xác thực đã được gửi đến email của bạn.", {
          position: "top-right",
          autoClose: 500, // Hiển thị thông báo 1.5 giây
          onClose: () => navigate(`${PATH_NAME.NEW_PASSWORD}?email=${encodeURIComponent(email)}`),
        });
        console.log("After toast success!");
      
        // Chờ 1.5 giây rồi chuyển trang
        // setTimeout(() => {
        //   navigate(`${PATH_NAME.NEW_PASSWORD}?email=${encodeURIComponent(email)}`);
        // }, 1700); // Thêm 200ms để chắc chắn toast đã đóng
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại.",
        {
          position: "top-right",
          autoClose: 500,
        }
      );
    }
  };

  return (
    <main className="login">
    <ToastContainer />
      <div className="login_container">
        <div className="login_wrapper">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="login_content_left_wrapper">
              <div className="login_content_left"></div>
            </div>
          </div>
          <div className="login_content_rights col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="login_box">
              <h3>Quên mật khẩu</h3>
              <div className="description">
                Hãy nhập địa chỉ email của bạn. Chúng tôi sẽ gửi cho bạn mã xác
                thực để truy cập lại vào tài khoản
              </div>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="login_box_input">
                  <div className="box">
                    <div className="box_email">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="input"
                        placeholder="Nhập địa chỉ email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button className="login_button" type="submit">
                  Tiếp tục
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
