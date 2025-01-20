import "./Header.scss";
import { Button, ConfigProvider, Flex } from "antd";
import logo2 from "../../../src/assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Flex justify="space-between" align="center" className="header__item">
        <Link to="/">
          <img className="header__item__logo" src={logo2} alt="Logo" />
        </Link>
        <Flex className="header__item__menu" >
          <p onClick={() => nav("/")}>Trang chủ</p>
          <p onClick={() => nav("/booking")}>Dự án</p>
          <p onClick={() => nav("/feedback")}>Tổ chức</p>
          <p onClick={() => nav("/about-us")}>Liên hệ</p>
          <p onClick={() => nav("/about-us")}>About</p>
        </Flex>
        <Flex className="header__item__button">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "rgb(44, 133, 51)",
                  defaultBg: "none",
                  defaultBorderColor: "rgb(190, 190, 190)",
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
                  defaultColor: "black",
                  defaultBg: "rgb(190, 190, 190)",
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
            <Link to="/sign-up">
              <Button className="header__item__button__right">Đăng kí</Button>
            </Link>
          </ConfigProvider>
        </Flex>
      </Flex>
    </header>
  );
}

export default Header;
