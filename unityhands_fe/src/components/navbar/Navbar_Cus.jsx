import "./Navbar_Cus.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import logo from "../../assets/Logo_module.png";
import { GoPerson } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar_Cus = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy số lượng sản phẩm trong giỏ hàng từ localStorage
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  });

  // Cập nhật giỏ hàng khi có thay đổi từ localStorage
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(parseInt(localStorage.getItem("cartCount")) || 0);
    };

    window.addEventListener("storage", updateCartCount); // Lắng nghe sự thay đổi
    updateCartCount(); // Cập nhật ngay khi component render
  
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true"; // Kiểm tra xem người dùng đã đăng nhập chưa
  });

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
    setIsLoggedIn(false); // Cập nhật state
    toast.success("Bạn đã đăng xuất thành công!", {
      position: "top-right",
      autoClose: 1000,
    });
    navigate(PATH_NAME.HOME); // Chuyển hướng về trang chủ
  };

  return (
    <header className="header">
    <ToastContainer/>
      <div className="header-container">
        <div className="header-logo-img">
          <Link to={PATH_NAME.HOME}>
            <img src={logo} alt="" className="header-logo" />
          </Link>
        </div>

        <div className="header-position-relative">
          <nav className="header-nav">
            <ul className="header-items">
              <li
                className={`header-nav-item ${
                  location.pathname === PATH_NAME.HOME ? "active" : ""
                }`}
              >
                <Link to={PATH_NAME.HOME}>Trang chủ</Link>
              </li>
              <li
                className={`header-nav-item ${
                  location.pathname === PATH_NAME.ABOUT_US ? "active" : ""
                }`}
              >
                <Link to={PATH_NAME.ABOUT_US}>Về chúng tôi</Link>
              </li>
              <li
                className={`header-nav-item ${
                  location.pathname === PATH_NAME.ITEMS ? "active" : ""
                }`}
              >
                <Link to={PATH_NAME.ITEMS}>Sản phẩm</Link>
              </li>
              <li
                className={`header-nav-item ${
                  location.pathname === "/system" ? "active" : ""
                }`}
              >
                <Link to="/system">Hệ thống</Link>
              </li>
              <li
                className={`header-nav-item ${
                  location.pathname === PATH_NAME.CONTACT_US ? "active" : ""
                }`}
              >
                <Link to={PATH_NAME.CONTACT_US}>Liên hệ</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          <form method="get" className="header-form-search" role="search">
            <input
              type="text"
              name="query"
              className="header-search-auto"
              placeholder="Tìm kiếm sản phẩm"
              autoComplete="off"
            />
            <button
              type="submit"
              className="header-btn-search"
              aria-label="Tìm kiếm"
            >
              <GoSearch />
            </button>
          </form>
          <div
            className="header-block-account"
            ref={profileDropdownRef}
            onClick={toggleProfileDropdown}
          >
            <GoPerson className="header-icons" />
            {isProfileDropdownOpen && (
              <div className="navbar-dropdowns">
                {isLoggedIn ? (
                  <>
                    <div className="navbar-profile-wrapper">
                      <Link
                        to={PATH_NAME.ACCOUNT}
                        className="navbar-profile-item"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Hồ sơ
                      </Link>
                    </div>
                    <div className="navbar-profile-wrapper">
                      <div
                        className="navbar-profile-item"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="navbar-profile-wrapper">
                      <Link
                        to={PATH_NAME.LOGIN}
                        className="navbar-profile-item"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Đăng nhập
                      </Link>
                    </div>
                    <div className="navbar-profile-wrapper">
                      <Link
                        to={PATH_NAME.REGISTER}
                        className="navbar-profile-item"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Đăng ký
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="header-block-cart">
            <Link to={PATH_NAME.SHOPPING_CARTS} className="header-cart">
              <BsCart3 className="header-icons" />
              <span className="header-count-item">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar_Cus;
