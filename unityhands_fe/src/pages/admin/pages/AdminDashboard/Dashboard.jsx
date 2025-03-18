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
import { BASE_URL } from "../../../../constant/config";
import api from "../../../../constant/axios";

const { Option } = Select;

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [dashboardData, setDashboardData] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    chartData: [],
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [product, setProduct] = useState([]);
  const salesTarget = {
    achieved: 1300,
    target: 1800,
  };
  const navigate = useNavigate();
  const salesPercentage = Math.round(
    (salesTarget.achieved / salesTarget.target) * 100
  );
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerCount, setCustomerCount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchCustomersCount = async () => {
    setLoading(true);
    try {
      const response = await api.get("/Account/count-user");
      setCustomerCount(response.data.totalAccounts);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng khách hàng:", error);
      message.error("Không thể tải số lượng khách hàng truy cập web!");
    }
  };
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}Order/get-all?PageSize=50`);
      console.log("Orders Response:", response.data);
      const orders = response.data.$values;
      // Sắp xếp đơn hàng theo ngày giảm dần (mới nhất trước)
      orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      const ordersData = orders.map((order) => ({
        key: order.id,
        orderId: `#DH${order.id}`, // Mã đơn hàng
        date: new Date(order.orderDate).toLocaleDateString("vi-VN"), // Chuyển đổi ngày tháng
        customer: order.deliveryInfo
          ? order.deliveryInfo.split(",")[1]?.split(":")[1].trim()
          : "Không xác định",
        status: order.paymentStatus,
        payment:
          order.paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán Online",
        total: `${order.totalAmount.toLocaleString()} VND`,
      }));
      const revenue = orders
        .filter((order) => order.paymentStatus === "done")
        .reduce((sum, order) => sum + order.totalAmount, 0);
      setTotalRevenue(revenue);
      setOrders(ordersData);
      setTotalOrders(orders.length);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng!");
    }
    setLoading(false);
  };

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
      const response = await axios.get(`${BASE_URL}Order/get-all?PageSize=50`);
      const orders = response.data.$values;
  
      // Ensure all orders are counted correctly
      const groupedData = orders.reduce((acc, order) => {
        const date = new Date(order.orderDate).toLocaleDateString("vi-VN"); // Format date
  
        if (!acc[date]) {
          acc[date] = { revenue: 0, orders: 0, customers: new Set() };
        }
  
        if (order.paymentStatus === "done") {
          acc[date].revenue += order.totalAmount;
        }
  
        acc[date].orders += 1;
        acc[date].customers.add(order.accountId);
        return acc;
      }, {});
  
      // Convert grouped data to an array for recharts
      const chartData = Object.keys(groupedData).map((date) => ({
        date,
        revenue: groupedData[date].revenue,
        orders: groupedData[date].orders,
        customers: groupedData[date].customers.size,
      }));
  
      // Ensure correct total calculations
      setDashboardData({
        revenue: chartData.reduce((sum, item) => sum + item.revenue, 0),
        orders: orders.length,
        customers: new Set(orders.map((o) => o.accountId)).size,
        chartData,
      });
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
      console.error(error);
    }
  };
  
  

  useEffect(() => {
    console.log("Updated Dashboard Data:", dashboardData);
    fetchCustomersCount();
    getDashboardData();
    getTopProducts();
    fetchOrders();
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

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "done" ? "green" : status === "waiting" ? "blue" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <b>{text}</b>,
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
                  value={`${totalRevenue.toLocaleString()} VND`}
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
                  value={totalOrders}
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
                  value={customerCount}
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
          <Card className="sale-target-card">
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
                onClick={() => navigate("/admin/products")}
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
              <Button type="default" onClick={() => navigate("/admin/orders")}>
                Xem tất cả
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={orders}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
