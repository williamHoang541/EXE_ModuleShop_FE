import { Row, Col, Input } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./ContactUs.css";
import useTitle from "../../constant/useTitle";

const ContactUs = () => {
    useTitle("Liên hệ");
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-top">
          <Col xs={24} className="contact-map">
            <iframe
              title="Google Map"
              width="100%"
              height="350"
              frameBorder="0"
              style={{ border: 0, borderRadius: "5px", marginTop: "20px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.789438437805!2d105.8093601750323!3d21.000556680640196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1816fd2e1b%3A0x8c0472a9cbb0c5ea!2zMjY2IMSQ4buZIEPhu5sgVGhhbmgsIFBow7ogSOG7uSwgQuG6oW0gxJDhu5NuZywgVGjDoG5oIFBow7ogSG_DoCwgVmnhu4duIE5hbQ!5e0!3m2!1sen!2s!4v1700832979534!5m2!1sen!2s"
              allowFullScreen
            ></iframe>
          </Col>
        </div>
        <div className="contact-bottom">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={10} className="contact-info">
              <h2>Thông tin liên hệ</h2>
              <div className="contact-infor">
                <p>
                  <EnvironmentOutlined /> FPT University Hồ Chí Minh
                </p>
                <p>
                  <MailOutlined /> support@module.vn
                </p>
                <p>
                  <PhoneOutlined /> 1800.6750
                </p>
                <p>
                  <ClockCircleOutlined /> T2 - T6: 8 AM - 5 PM <br /> T7 - CN: 8
                  AM - 2 PM
                </p>
              </div>
            </Col>
            <Col xs={24} md={14} className="contact-form">
              <h2>Gửi liên hệ cho chúng tôi</h2>
              <Row gutter={[16, 16]} className="contact-form">
                <Col xs={24} sm={12} className="contact-form-item">
                  <Input placeholder="Họ và tên" />
                </Col>
                <Col xs={24} sm={12} className="contact-form-item">
                  <Input placeholder="Điện thoại *" />
                </Col>
                <Col xs={24} className="contact-form-item">
                  <Input placeholder="Email" />
                </Col>
                <Col xs={24} className="contact-form-item">
                  <Input placeholder="Tiêu đề" />
                </Col>
                <Col xs={24} className="contact-form-item">
                  <Input.TextArea placeholder="Nội dung" rows={4} />
                </Col>
                <Col xs={24} className="contact-form-item">
                  <button type="submit" className="contact-button">
                    GỬI THÔNG TIN
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
