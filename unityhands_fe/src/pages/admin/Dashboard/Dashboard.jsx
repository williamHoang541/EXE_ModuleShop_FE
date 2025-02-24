import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Col,
  Row,
  Statistic,
  Select,
  message,
  Button,
  List,
  Avatar,
  Tag,
  Progress,
} from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { Content } from "antd/es/layout/layout";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [dashboardData, setDashboardData] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    chartData: [],
  });
  const [product, setProduct] = useState([]);
  const salesTarget = {
    achieved: 1300, // Đã đạt được
    target: 1800, // Mục tiêu
  };
  const navigate = useNavigate();
  const salesPercentage = Math.round(
    (salesTarget.achieved / salesTarget.target) * 100
  );

  const getTopProducts = async () => {
    try {
      const response = await axios.get(
        "https://67bb583afbe0387ca139d151.mockapi.io/api/admin/product-rating"
      );
      setProduct(response.data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
      console.error(error);
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        "https://67bb583afbe0387ca139d151.mockapi.io/api/admin/dashboard"
      );

      const chartData = response.data.map((item) => ({
        date: `${item.day}/${item.month}/${item.year}`,
        revenue: item.revenue,
        orders: item.orders,
        customers: item.customers,
      }));

      setDashboardData({
        revenue: response.data.reduce((sum, item) => sum + item.revenue, 0),
        orders: response.data.reduce((sum, item) => sum + item.orders, 0),
        customers: response.data.reduce((sum, item) => sum + item.customers, 0),
        chartData: chartData,
      });
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
      console.error(error);
    }
  };

  useEffect(() => {
    getDashboardData();
    getTopProducts();
  }, []);

  const getMetricTitle = () => {
    switch (selectedMetric) {
      case "revenue":
        return "doanh thu";
      case "orders":
        return "đơn hàng";
      case "customers":
        return "khách hàng";
      default:
        return "";
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ padding: "20px" }}>
          <div className="dashboard">
            <Row gutter={[16, 16]}>
              <Col span={18}>
                <Card className="chart-card">
                  <div className="stats-container">
                    <Card
                      className={`stat-card ${
                        selectedMetric === "revenue" ? "active" : ""
                      }`}
                      onClick={() => setSelectedMetric("revenue")}
                    >
                      <Statistic
                        title="Tổng doanh thu"
                        value={`${dashboardData.revenue.toLocaleString()} VND`}
                        prefix={<DollarOutlined />}
                      />
                    </Card>
                    <Card
                      className={`stat-card ${
                        selectedMetric === "orders" ? "active" : ""
                      }`}
                      onClick={() => setSelectedMetric("orders")}
                    >
                      <Statistic
                        title="Tổng đơn hàng"
                        value={dashboardData.orders}
                        prefix={<ShoppingCartOutlined />}
                      />
                    </Card>
                    <Card
                      className={`stat-card ${
                        selectedMetric === "customers" ? "active" : ""
                      }`}
                      onClick={() => setSelectedMetric("customers")}
                    >
                      <Statistic
                        title="Khách hàng"
                        value={dashboardData.customers}
                        prefix={<UserOutlined />}
                      />
                    </Card>
                  </div>
                  <div className="chart-header">
                    <h3>Thống kê {getMetricTitle()}</h3>
                    <Select defaultValue="month" className="chart-select">
                      <Option value="month">Tháng</Option>
                      <Option value="year">Năm</Option>
                    </Select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.chartData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <CartesianGrid stroke="#ddd" />
                      <Line
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#936a49"
                        strokeWidth={2}
                        dot={{ fill: "#936a49", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ marginBottom: "20px", width: 300 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3>Sales target</h3>
                      <p style={{ marginBottom: 0 }}>
                        <b>{salesTarget.achieved.toLocaleString()}K</b> /{" "}
                        {salesTarget.target.toLocaleString()} Units
                      </p>
                      <span style={{ color: "gray" }}>Made this month</span>
                    </div>
                    <Progress
                      type="circle"
                      percent={salesPercentage}
                      width={60}
                    />
                  </div>
                </Card>
                <Card className="top-products-card">
                  <div className="top-products-header">
                    <h3>Sản phẩm bán chạy</h3>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => navigate("/products")}
                    >
                      Xem tất cả
                    </Button>
                  </div>
                  <List
                    itemLayout="horizontal"
                    dataSource={product}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar shape="square" size={50} src={item.image} />
                          }
                          title={<b>{item.name}</b>}
                          description={`Đã bán: ${item.sold}`}
                        />
                        <Tag color={item["sell-rating"] >= 0 ? "green" : "red"}>
                          {item["sell-rating"] > 0
                            ? `+${item["sell-rating"]}%`
                            : `${item["sell-rating"]}%`}
                        </Tag>
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
};

export default Dashboard;
