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
  Table,
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
  const [orders, setOrders] = useState([
    {
      key: "1",
      order: "#92627",
      status: "Paid",
      date: "09/07/2022",
      customer: "Tara Fletcher",
      amount: 279.00,
    },
    {
      key: "2",
      order: "#92509",
      status: "Pending",
      date: "26/06/2022",
      customer: "Joyce Freeman",
      amount: 831.00,
    },
    {
      key: "3",
      order: "#91631",
      status: "Paid",
      date: "18/06/2022",
      customer: "Brittany Hale",
      amount: 142.00,
    },
    {
      key: "4",
      order: "#90963",
      status: "Paid",
      date: "11/06/2022",
      customer: "Luke Cook",
      amount: 232.00,
    },
    {
      key: "5",
      order: "#89332",
      status: "Pending",
      date: "02/06/2022",
      customer: "Eileen Horton",
      amount: 597.00,
    },
    {
      key: "6",
      order: "#89107",
      status: "Failed",
      date: "17/04/2022",
      customer: "Frederick Adams",
      amount: 72.00,
    },
    {
      key: "7",
      order: "#89021",
      status: "Paid",
      date: "13/04/2022",
      customer: "Lee Wheeler",
      amount: 110.00,
    },
  ]);
  const salesTarget = {
    achieved: 1300, 
    target: 1800, 
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

  const getRecentOrders = async () => {
    try {
      const response = await axios.get(
        "https://67bb583afbe0387ca139d151.mockapi.io/api/admin/orders"
      );
      setOrders(response.data);
    } catch (error) {
      // message.error("Lỗi khi tải đơn hàng!");
      console.error(error);
    }
  };

  useEffect(() => {
    getDashboardData();
    getTopProducts();
    getRecentOrders();
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

  const orderColumns = [
    {
      title: "ĐƠN HÀNG",
      dataIndex: "order",
      key: "order",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Paid" ? "green" : status === "Pending" ? "orange" : "red";
        return (
          <Tag color={color} style={{ fontWeight: "bold" }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "NGÀY ĐẶT HÀNG",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "KHÁCH HÀNG",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "SỐ TIỀN",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <b>${amount.toFixed(2)}</b>,
    },
  ];

  return (
          <div className="dashboard">
            <Row gutter={[16, 16]}>
              <Col span={17}>
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
              <Col span={7}>
                <Card
                  className="sale-target-card"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="sale-target-info">
                      <h3>Mục tiêu</h3>
                      <p>
                        <b>{salesTarget.achieved.toLocaleString()}K</b> /{" "}
                        {salesTarget.target.toLocaleString()} Đơn
                      </p>
                      <span style={{ color: "gray" }}>Tháng này</span>
                    </div>
                    <Progress
                      type="circle"
                      percent={salesPercentage}
                      width={60}
                      strokeColor="#936a49"
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
                    dataSource={product.slice(0, 5)}
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
            <Row>
              <Col span={24}>
                <Card className="recent-orders-card">
                  <div className="recent-orders-header">
                    <h3>Đơn hàng gần đây</h3>
                    <Button type="default" onClick={() => navigate("/orders")}>Xem tất cả</Button>
                  </div>
                  <Table columns={orderColumns} dataSource={orders} pagination={false} />
                </Card>
              </Col>
            </Row>
          </div>
  );
};

export default Dashboard;
