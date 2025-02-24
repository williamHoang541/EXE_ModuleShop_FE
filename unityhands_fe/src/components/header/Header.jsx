import "./Header.css";
import { Button, ConfigProvider, Flex } from "antd";
import logo2 from "../../../src/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";


function Header() {
  const nav = useNavigate();
  return (
    <header className="custom__header">
      <Flex justify="space-between" align="center" className="custom__header__item">
        <Link to="/">
          <img className="custom__header__item__logo" src={logo2} alt="Logo" />
        </Link>
        <Flex className="custom__header__item__menu" >
          <p onClick={() => nav(PATH_NAME.HOMEPAGE)}>Trang chủ</p>
          <p onClick={() => nav(PATH_NAME.ITEMS)}>Sản phẩm</p>
          <p onClick={() => nav(PATH_NAME.ABOUT_US)}>Về chúng tôi</p>
          <p onClick={() => nav(PATH_NAME.CONTACT_US)}>Liên hệ</p>
        </Flex>
        <Flex className="custome__header__item__button">
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
                  // defaultFontSize: "10px",
                },
              },
            }}
          >
            <Link to="/login">
              <Button className="custom__header__item__button__left">Đăng nhập</Button>
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
              <Button className="custom__header__item__button__right">Đăng kí</Button>
            </Link>
          </ConfigProvider>
        </Flex>
      </Flex>
    </header>
  );
}

export default Header;
