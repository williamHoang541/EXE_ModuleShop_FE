import "./NewPassword.css";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";

const NewPassword = () => {
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // Hàm lấy timestamp hiện tại + 5 phút
  const getExpirationTime = () => {
    return Date.now() + 5 * 60 * 1000; // 5 phút sau
  };

  // Xử lý khi nhấn "Cập nhật mật khẩu"
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ mật khẩu.");
      return;
    }

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    setError(""); // Xóa lỗi nếu hợp lệ

    // Tính thời gian hết hạn
    const endTime = getExpirationTime();

    // Chuyển đến trang OTP với email và thời gian hết hạn
    navigate(`${PATH_NAME.OTP_AUTHENTICATION}?email=${encodeURIComponent(email)}&endTime=${endTime}`);
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
              <h3>Nhập mật khẩu</h3>
              <div className="description">
                Hãy chọn hiện mật khẩu để kiểm tra mật khẩu của bạn trước khi
                hoàn tất
              </div>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="register_box_input">
                  <div className="box">
                    <div className="box_password">
                      <input
                        type="password"
                        className="input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="box">
                    <div className="box_password">
                      <input
                        type="password"
                        className="input"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                {error && <p className="error-text-1">{error}</p>}
                <button className="register_button" type="submit">
                  Cập nhật mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewPassword;
