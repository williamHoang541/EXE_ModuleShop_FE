import "./Navbar_Cus.css";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import logo from "../../assets/Logo_module.png";
import { GoPerson } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

const Navbar_Cus = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-img">
          <Link to={PATH_NAME.HOME}>
            <img src={logo} alt="" className="header-logo" />
          </Link>
        </div>

        <div className="header-position-relative">
          <nav className="header-nav">
            <ul className="header-items">
              <li className="header-nav-item">
                <Link to={PATH_NAME.HOME}>Trang chủ</Link>
              </li>
              <li className="header-nav-item">Về chúng tôi</li>
              <li className="header-nav-item">Sản phẩm</li>
              <li className="header-nav-item">Hệ thống</li>
              <li className="header-nav-item">Liên hệ</li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          <form
            method="get"
            className="header-form-search"
            role="search"
          >
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
          <div className="header-block-account">
            <GoPerson className="header-icons" />
          </div>
          <div className="header-block-cart">
            <div className="header-cart">
              <BsCart3 className="header-icons" />
              <span className="header-count-item">0</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar_Cus;
