import "./Header.css";
import { Button, ConfigProvider, Flex } from "antd";
import logo2 from "../../../src/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";


function Header() {
  const nav = useNavigate();
  return (
    <header className="header">
      <Flex justify="space-between" align="center" className="header__item">
        <Link to="/">
          <img className="header__item__logo" src={logo2} alt="Logo" />
        </Link>
        <Flex className="header__item__menu" >
          <p onClick={() => nav(PATH_NAME.HOMEPAGE)}>Trang chủ</p>
          <p onClick={() => nav(PATH_NAME.ITEMS)}>Sản phẩm</p>
          <p onClick={() => nav(PATH_NAME.ABOUT_US)}>Về chúng tôi</p>
        </Flex>
        <Flex className="header__item__button">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "#936a49",
                  defaultBg: "none",
                  defaultBorderColor: "rgb(243, 241, 241)",
                  defaultHoverBorderColor: "white",
                  defaultHoverColor: "none",
                  defaultHoverBg: "none",
                  defaultActiveBg: "none",
                  defaultActiveBorderColor: "black",
                  defaultActiveColor: "white",
                },
              },
            }}
          >
            <Link to="/login">
              <Button className="header__item__button__left">Đăng nhập</Button>
            </Link>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "white",
                  defaultBg: "#936a49",
                  defaultBorderColor: "rgb(190, 190, 190)",
                  defaultHoverBorderColor: "white",
                  defaultHoverColor: "black",
                  defaultHoverBg: "white",
                  defaultActiveBg: "none",
                  defaultActiveBorderColor: "black",
                  defaultActiveColor: "white",
                },
              },
            }}
          >
            <Link to="/register">
              <Button className="header__item__button__right">Đăng kí</Button>
            </Link>
          </ConfigProvider>
        </Flex>
      </Flex>
    </header>
  );
}

export default Header;
