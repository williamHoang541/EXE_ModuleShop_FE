import React from "react";
import "./AboutUs.css";
import { Card, Col, Row, Typography, Divider, Image } from "antd";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const { Title, Paragraph } = Typography;

const teamMembers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "CEO & Founder",
    image: "/member/ceo.jpg",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Quản lý cửa hàng",
    image: "/member/manager.jpg",
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Nhân viên tư vấn",
    image: "/member/staff1.jpg",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    role: "Nhân viên bán hàng",
    image: "/member/staff2.jpg",
  },
];

function AboutUs() {
  return (
    <>
      
      <div className="about-container">
        {/* Giới thiệu cửa hàng */}
        <section className="about-intro">
          <Title level={2} className="section-title">
            Về Chúng Tôi
          </Title>
          <Divider />
          <Paragraph className="about-text">
            Chào mừng bạn đến với <b>Module Furniture Shop</b> – nơi mang đến
            những sản phẩm nội thất gỗ cao cấp, bền bỉ và tinh tế. Chúng tôi tự
            hào là một trong những cửa hàng hàng đầu trong lĩnh vực nội thất gỗ
            tại Việt Nam.
          </Paragraph>
          <Paragraph className="about-text">
            Với hơn <b>10 năm kinh nghiệm</b> trong ngành, chúng tôi không chỉ
            cung cấp sản phẩm chất lượng mà còn mang đến trải nghiệm mua sắm
            tuyệt vời cho khách hàng. Từ bàn ghế, giường tủ cho đến kệ trang trí
            – tất cả đều được chế tác từ gỗ tự nhiên cao cấp.
          </Paragraph>
        </section>

        {/* Hình ảnh cửa hàng */}
        <section className="about-gallery">
          <Title level={2} className="section-title">
            Hình Ảnh Cửa Hàng
          </Title>

          <Divider />
          <Row gutter={[16, 16]} justify="center" align="middle">
            <Col xs={24} sm={12} md={8}>
              <Image
                src="/items/do_go_3.jpg"
                alt="Cửa hàng nội thất"
                className="about-image"
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Image
                src="/items/do_go_4.jpg"
                alt="Khu trưng bày sản phẩm"
                className="about-image"
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Image
                src="/items/do_go_1.jpg"
                alt="Góc trang trí nội thất"
                className="about-image"
              />
            </Col>
          </Row>
        </section>

        <section className="about-team">
          <Title level={2} className="section-title">
            Đội Ngũ Của Chúng Tôi
          </Title>
          <Divider />
          <Row gutter={[16, 16]}>
            {teamMembers.map((member) => (
              <Col key={member.id} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  className="team-card"
                  cover={
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                    />
                  }
                >
                  <Card.Meta title={member.name} description={member.role} />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="about-thank-you">
          <Title level={2} className="about-section-title">
            Cảm Ơn Khách Hàng
          </Title>
          <Divider />
          <Paragraph className="about-text">
            Chúng tôi cam kết mang đến những sản phẩm nội thất tốt nhất, giúp
            ngôi nhà của bạn trở nên sang trọng và ấm cúng hơn. Cảm ơn bạn đã
            tin tưởng và đồng hành cùng <b>Module Furniture Shop</b>.
          </Paragraph>
        </section>
      </div>
    
    </>
  );
}

export default AboutUs;
