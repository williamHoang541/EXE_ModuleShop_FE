import "./Login.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";

const Login = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
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
              <h3>Đăng nhập</h3>
              <form autoComplete="off">
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
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="login_forget_password">
                  <a href="#">Quên mật khẩu</a>
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
