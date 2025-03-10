import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { PATH_NAME } from "../../../constant/pathname";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import useTitle from "../../../constant/useTitle";
import { BASE_URL } from "../../../constant/config";

const Register = () => {
  const navigate = useNavigate();
  useTitle("Đăng ký");

  // Dùng useRef thay vì useState để giảm re-render
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    Promise.allSettled([
      axios.post(`${BASE_URL}Account/registration`, { email, password, confirmPassword }),
    ]).then((results) => {
      const result = results[0];

      if (result.status === "fulfilled") {
        toast.success("Đăng ký thành công!", {
          position: "top-right",
          autoClose: 500,
          onClose: () => navigate(PATH_NAME.LOGIN),
        });
      } else {
        toast.error(result.reason.response?.data?.message || "Đăng ký thất bại!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
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
              <h3>Đăng ký tài khoản</h3>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="register_box_input">
                  <div className="box">
                    <div className="box_email">
                      <input
                        type="email"
                        ref={emailRef}
                        className="input"
                        placeholder="Nhập địa chỉ email"
                        required
                      />
                    </div>
                  </div>

                  <div className="box">
                    <div className="box_password">
                      <input
                        type="password"
                        ref={passwordRef}
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
                        ref={confirmPasswordRef}
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
