import "./Login.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME, API_KEY } from "../../../constant/pathname";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Hàm xử lý đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = { email, password };
    const url = `${API_KEY}Authorize/login`;
    try {
      const { data: token } = await axios.post(url, loginData);
      localStorage.setItem("Authen", JSON.stringify(token));

      // Giải mã token ngay lập tức, không cần gọi API dư thừa
      const decodedToken = jwtDecode(token);
      const userRole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigateBasedOnRole(userRole);
        }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Email hoặc mật khẩu không đúng!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const navigateBasedOnRole = (role) => {
    console.log("Navigating based on role:", role);
    switch (role) {
      case "admin":
        navigate(PATH_NAME.HOME);
        break;
      case "user":
        navigate(PATH_NAME.HOME);
        break;
      default:
        toast.error("Tên đăng nhập không tồn tại", {
          position: "top-right",
          autoClose: 3000,
        });
        break;
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
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
              <h3>Đăng nhập</h3>
              {/* {loginError && <p className="error-message">{loginError}</p>} */}
              <form autoComplete="off" onSubmit={handleLogin}>
                <div className="login_box_input">
                  <label htmlFor="email">Email</label>
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
                <div className="login_box_input">
                  <label htmlFor="password">Mật khẩu</label>
                  <div className="box">
                    <div className="box_password">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="login_forget_password">
                  <Link to={PATH_NAME.FORGOT_PASSWORD}>Quên mật khẩu</Link>
                </div>
                <button className="login_button" type="submit">
                  Đăng nhập
                </button>
              </form>
              <div className="login_text_register">
                Bạn chưa có tài khoản?
                <Link to={PATH_NAME.REGISTER}>Đăng ký ngay</Link>
              </div>
              <div className="login_text_continue">
                <span>hoặc tiếp tục với</span>
              </div>
              <div className="google">
                <GoogleOAuthProvider clientId="967060194344-ddfgvrhsmeeus3o56ocmg5rhsg7m5dg2.apps.googleusercontent.com">
                  <div className="login_google">
                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginError}
                    />
                  </div>
                </GoogleOAuthProvider>
              </div>
              <div className="login_rule">
                Bằng việc tiếp tục, bạn đã đồng ý với
                <a href="#">Điều khoản sử dụng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
