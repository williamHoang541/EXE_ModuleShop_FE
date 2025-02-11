import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Button, ConfigProvider, Flex } from "antd";
import "./Footer.scss";

function Footer() {
  return (
    <div>
      <Flex justify="space-between" className="footer">
        <Link to="/">
          <img className="footer__logo" src={logo} />
        </Link>
        <div className="footer__item">
          <h4 className="footer__item__title">Sản phẩm</h4>
          <p className="footer__item__content ">Về chúng tôi</p>
          <p className="footer__item__content ">Đặt hàng</p>
          <p className="footer__item__content ">Dịch vụ</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item__title">Chi nhánh</h4>
          <p className="footer__item__content">CN1: 34 Đường C, Quận 1</p>
          <p className="footer__item__content">CN2: 4 Đường B, Quận 2</p>
          <p className="footer__item__content">CN3: 34 Đường H, Quận 3</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item__title">Thời gian hoạt động</h4>
          <p className="footer__item__content">Thứ 2 - Thứ 6: 8:00 - 21:00</p>
          <p className="footer__item__content">Thứ 7 - Chủ nhật: 8:00 - 16:00</p>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "white",
                  defaultBg: "#43321b",
                  defaultBorderColor: "#43321b",
                  defaultHoverBorderColor: "black",
                  defaultHoverColor: "white",
                  defaultHoverBg: "#936a49",
                  defaultActiveBg: "#43321b",
                  defaultActiveBorderColor: "#43321b",
                  defaultActiveColor: "black",
                },
              },
            }}
          >
            <Button className="footer__item__button">Đặt hàng ngay</Button>
          </ConfigProvider>
        </div>
      </Flex>
    </div>
  );
}

export default Footer;