import React from "react";
import { Row, Col, Input, Button } from "antd";
import { MailOutlined, PhoneOutlined, ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./ContactUs.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const ContactUs = () => {
    return (
        <div className="contact-page">
            <Header />
            <div className="contact-container">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={10} className="contact-info">
                        <h2>Thông tin liên hệ</h2>
                        <p><EnvironmentOutlined /> Tầng 6, Tòa Ladeco, 266 Đội Cấn, Quận Ba Đình, TP Hà Nội</p>
                        <p><MailOutlined /> support@sapo.vn</p>
                        <p><PhoneOutlined /> 1800.6750</p>
                        <p><ClockCircleOutlined /> T2 - T6: 8 AM - 5 PM <br /> T7 - CN: 8 AM - 2 PM</p>
                    </Col>
                    <Col xs={24} md={14} className="contact-form">
                        <h2>Gửi liên hệ cho chúng tôi</h2>
                        <Row gutter={[16, 16]} className="contact-form">
                            <Col xs={24} sm={12} className="contact-form-item"><Input placeholder="Họ và tên" /></Col>
                            <Col xs={24} sm={12} className="contact-form-item"><Input placeholder="Điện thoại *" /></Col>
                            <Col xs={24} className="contact-form-item"><Input placeholder="Email" /></Col>
                            <Col xs={24} className="contact-form-item"><Input placeholder="Tiêu đề" /></Col>
                            <Col xs={24} className="contact-form-item"><Input.TextArea placeholder="Nội dung" rows={4} /></Col>
                            <Col xs={24} className="contact-form-item">
                                <Button
                                    type="primary"
                                    className="contact-button"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#8b5e3c",
                                        border: "none",
                                        height: "55px",
                                        padding: "12px",
                                        fontSize: "1.1em",
                                        fontWeight: "bold",
                                        color: "white",
                                        borderRadius: "5px",
                                        transition: "0.3s ease-in-out"
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = "#d5ad82"}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = "#8b5e3c"}
                                >
                                    GỬI THÔNG TIN
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
