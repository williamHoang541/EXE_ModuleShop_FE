import "./OTPAuth.css";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
const OTPAuth = () => {
    const [otp, setOtp] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");
    const initialEndTime = parseInt(searchParams.get("endTime"), 10) || Date.now() + 300000; // Default 5 phút
    const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.floor((initialEndTime - Date.now()) / 1000)));
    const navigate = useNavigate();

    // Countdown Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Xử lý gửi lại OTP
  const handleResendOtp = () => {
    const newEndTime = Date.now() + 300000; // 5 phút
    setSearchParams({ email, endTime: newEndTime });
    setTimeLeft(300);
    alert("Mã OTP đã được gửi lại!");
  };

  // Xác thực OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      alert("Xác thực thành công!");
      navigate(`${PATH_NAME.LOGIN}`); // Quay lại trang đăng nhập
    } else {
      alert("Mã OTP không hợp lệ!");
    }
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
              <h3>Xác thực OTP</h3>
              <div className="description">
                Vui lòng nhập mã xác thực đã gửi đến:
              </div>
              <p className="otp_email">{email}</p>
              <form autoComplete="off" onSubmit={handleVerifyOtp}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle="otp_input"
                  renderInput={(props) => <input {...props} />}
                />
                <div className="time">
                  Chưa nhận được mã xác thực? Gửi lại sau
                  <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}</span>
                </div>
                <div className={`send_again ${timeLeft === 0 ? "active" : "disabled"}`} onClick={timeLeft === 0 ? handleResendOtp : null}>Gửi lại</div>
                <button className="register_button" type="submit">
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

export default OTPAuth;
