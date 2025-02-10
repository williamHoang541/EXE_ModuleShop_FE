import { PATH_NAME } from "../../../constant/pathname";
import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Hàm kiểm tra email hợp lệ
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Xử lý khi bấm "Tiếp tục"
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form submit mặc định

    if (!email) {
      setError("Vui lòng nhập email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    setError(""); // Xóa lỗi nếu hợp lệ

    // Chuyển sang trang new-password với email trong URL
    navigate(`${PATH_NAME.NEW_PASSWORD}?email=${encodeURIComponent(email)}`);
  };

  return (
    <main className="login">
      <div className="login_container">
        <div className="login_wrapper">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="login_content_left_wrapper">
              <div className="login_content_left"></div>
            </div>
          </div>
          <div className="login_content_right col-xl-6 col-lg-6 col-md-6 col-12">
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
                {error && <p className="error-text">{error}</p>}
               
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
