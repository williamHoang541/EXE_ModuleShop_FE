import { Link } from "react-router-dom";
import "./Register.css";
import { PATH_NAME } from "../../../constant/pathname";

const Register = () => {
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
              <h3>Đăng ký tài khoản</h3>
              <form autoComplete="off">
                <div className="register_box_input">
                  <div className="box">
                    <div className="box_email">
                      <input
                        type="email"
                        className="input"
                        placeholder="Nhập địa chỉ email"
                        required
                      />
                    </div>
                  </div>

                  <div className="box">
                    <div className="box_email">
                      <input
                        type="text"
                        className="input"
                        placeholder="Họ và tên"
                        required
                      />
                    </div>
                  </div>

                  <div className="box">
                    <div className="box_password">
                      <input
                        type="password"
                        className="input"
                        placeholder="Nhập mật khẩu"
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
                        required
                      />
                    </div>
                  </div>
                </div>
                <button className="register_button" type="submit">
                  Đăng ký
                </button>
              </form>
              <div className="register_text_login">
                Bạn đã có tài khoản
                <Link to={PATH_NAME.LOGIN}>Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
