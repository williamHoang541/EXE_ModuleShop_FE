import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, message, Space, Table, Tag } from "antd";
import {
  EyeOutlined,
  FilterOutlined,
  SearchOutlined
} from "@ant-design/icons";
import "./AdminOrders.css";
import { BASE_URL } from "../../../../constant/config";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}Order/get-all`);
      const ordersData = response.data.$values.map((order) => ({
        key: order.id,
        orderId: `#DH${order.id}`, // Mã đơn hàng
        date: new Date(order.orderDate).toLocaleDateString("vi-VN"), // Chuyển đổi ngày tháng
        customer: order.deliveryInfo
          ? order.deliveryInfo.split(",")[1]?.split(":")[1].trim()
          : "Không xác định",
        status: order.paymentStatus, // Trạng thái thanh toán
        payment:
          order.paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán Online",
        total: `${order.totalAmount.toLocaleString()} VND`,
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="admin-orders">
        <div className="orders-header">
          <h2>Quản lý đơn hàng</h2>
        </div>
        <div className="search-bar">
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
          <Button icon={<FilterOutlined />}>Lọc</Button>
        </div>
        <Table
          columns={columns}
          dataSource={orders}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
}

export default AdminOrders;
