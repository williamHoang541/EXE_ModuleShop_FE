import React from "react";
import { Layout, Card, Col, Row, Statistic, Select, List, Avatar, Tag, Button } from "antd";
import { ShoppingCartOutlined, DollarOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { Content } from "antd/es/layout/layout";
import "./Dashboard.css";

const { Option } = Select;

const revenueData = [
  { date: "01 Jun", revenue: 200 },
  { date: "02 Jun", revenue: 300 },
  { date: "03 Jun", revenue: 400 },
  { date: "04 Jun", revenue: 350 },
  { date: "05 Jun", revenue: 450 },
  { date: "06 Jun", revenue: 500 },
  { date: "07 Jun", revenue: 550 },
  { date: "08 Jun", revenue: 450 },
  { date: "09 Jun", revenue: 480 },
  { date: "10 Jun", revenue: 530 },
  { date: "11 Jun", revenue: 400 },
  { date: "12 Jun", revenue: 600 },
];

const topProducts = [
  {
    id: 1,
    image: "/images/product1.jpg",
    name: "Bàn gỗ sồi",
    sold: 1249,
    growth: "+15.2%",
    growthColor: "green",
  },
  {
    id: 2,
    image: "/images/product2.jpg",
    name: "Ghế gỗ cao cấp",
    sold: 1145,
    growth: "+13.9%",
    growthColor: "green",
  },
  {
    id: 3,
    image: "/images/product3.jpg",
    name: "Tủ quần áo gỗ",
    sold: 1073,
    growth: "+9.5%",
    growthColor: "green",
  },
  {
    id: 4,
    image: "/images/product4.jpg",
    name: "Giường ngủ gỗ",
    sold: 1022,
    growth: "+2.3%",
    growthColor: "green",
  },
  {
    id: 5,
    image: "/images/product5.jpg",
    name: "Kệ sách gỗ",
    sold: 992,
    growth: "-0.7%",
    growthColor: "red",
  },
  {
    id: 6,
    image: "/images/product6.jpg",
    name: "Tủ giày gỗ",
    sold: 1201,
    growth: "-1.1%",
    growthColor: "red",
  },
];

function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ padding: "20px" }}>
          <div className="dashboard">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic title="Tổng doanh thu" value="10,000,000 VND" prefix={<DollarOutlined />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Tổng đơn hàng" value={100} prefix={<ShoppingCartOutlined />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Khách hàng mới" value={25} prefix={<UserOutlined />} />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              <Col span={16}>
                <Card className="chart-card">
                  <div className="chart-header">
                    <h3>Thống kê doanh thu</h3>
                    <Select defaultValue="Tháng" className="chart-select">
                      <Option value="month">Tháng</Option>
                      <Option value="year">Năm</Option>
                    </Select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <CartesianGrid stroke="#ccc" />
                      <Line type="monotone" dataKey="revenue" stroke="#936a49" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              <Col span={8}>
                <Card className="top-products-card">
                  <div className="top-products-header">
                    <h3>Sản phẩm bán chạy</h3>
                    <Button type="link" icon={<EyeOutlined />}>
                      Xem tất cả
                    </Button>
                  </div>
                  <List
                    itemLayout="horizontal"
                    dataSource={topProducts}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" size={50} src={item.image} />}
                          title={<b>{item.name}</b>}
                          description={`Đã bán: ${item.sold}`}
                        />
                        <Tag color={item.growthColor}>{item.growth}</Tag>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
