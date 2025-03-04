import "./NewPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import OTPInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import  useTitle from "../../../constant/useTitle";
import { BASE_URL } from "../../../constant/config";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  useTitle("Mật khẩu mới");

  // Xử lý khi nhấn "Cập nhật mật khẩu"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || !otp) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}Account/reset-password`,
        null, 
        {
          params: {
            token: otp, 
            newPassword: password,
            confirmPassword: confirmPassword,
          },
        }
      );
      
      toast.success("Mật khẩu đã được cập nhật thành công!",{
        position: "top-right",
        autoClose: 500,
      });
      setTimeout(() => navigate(PATH_NAME.LOGIN), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Cập nhật mật khẩu thất bại!",{
          position: "top-right",
        autoClose: 3000,
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

                  <div className="box">
                    <div className="box-otp">
                      <p className="box-label">Mã OTP</p>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        inputStyle="otp_input"
                        renderInput={(props) => <input {...props} />}
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
