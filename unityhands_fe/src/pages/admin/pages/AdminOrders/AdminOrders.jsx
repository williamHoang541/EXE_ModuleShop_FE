import "./AdminOrders.css";
import { Layout, Table, Button, Input, Space, Tag } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
const { Content } = Layout;

const ordersData = [
  {
    key: "1",
    orderId: "#DH001",
    date: "10/08/2023",
    customer: "Nguyễn Văn A",
    status: "Đã thanh toán",
    payment: "VISA ****6165",
    total: "5,000,000 VND",
  },
  {
    key: "2",
    orderId: "#DH002",
    date: "30/07/2023",
    customer: "Trần Thị B",
    status: "Đang xử lý",
    payment: "VISA ****7128",
    total: "2,500,000 VND",
  },
  {
    key: "3",
    orderId: "#DH003",
    date: "18/07/2023",
    customer: "Lê Văn C",
    status: "Thất bại",
    payment: "PayPal ****@gmail.com",
    total: "8,000,000 VND",
  },
  {
    key: "4",
    orderId: "#DH004",
    date: "09/07/2023",
    customer: "Phạm Văn D",
    status: "Đang giao hàng",
    payment: "MasterCard ****0921",
    total: "15,000,000 VND",
  },
];

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
        status === "Đã thanh toán"
          ? "green"
          : status === "Đang xử lý"
          ? "blue"
          : status === "Đang giao hàng"
          ? "orange"
          : "red";
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
    render: () => (
      <Space size="middle">
        <Button icon={<EyeOutlined />} />
        <Button icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];

function AdminOrders() {
  return (
    <>
      <div className="admin-orders">
        <div className="orders-header">
          <h2>Quản lý đơn hàng</h2>
          <Space>
            <Button icon={<ExportOutlined />}>Xuất Excel</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-order-button"
            >
              Thêm đơn hàng
            </Button>
          </Space>
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
          dataSource={ordersData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
}

export default AdminOrders;
