import './Customer.css'
import { Layout, Table, Button, Input, Space, Tag, Avatar } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const customersData = [
  {
    key: "1",
    avatar: "/images/avatar1.jpg",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    location: "Hà Nội, VN",
    status: "Hoạt động",
    spent: "15,000,000 VND",
  },
  {
    key: "2",
    avatar: "/images/avatar2.jpg",
    name: "Trần Thị B",
    email: "tranthib@hotmail.com",
    location: "TP. Hồ Chí Minh, VN",
    status: "Bị khóa",
    spent: "5,000,000 VND",
  },
  {
    key: "3",
    avatar: "/images/avatar3.jpg",
    name: "Lê Văn C",
    email: "levanc@outlook.com",
    location: "Đà Nẵng, VN",
    status: "Hoạt động",
    spent: "2,500,000 VND",
  },
  {
    key: "4",
    avatar: "/images/avatar4.jpg",
    name: "Phạm Minh D",
    email: "phamminhd@yahoo.com",
    location: "Cần Thơ, VN",
    status: "Hoạt động",
    spent: "10,000,000 VND",
  },
];

const columns = [
  {
    title: "Tên khách hàng",
    dataIndex: "avatar",
    key: "avatar",
    render: (img, record) => (
      <Space>
        <Avatar size={40} src={img} />
        <div>
          <b>{record.name}</b>
        </div>
      </Space>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Địa điểm",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      let color = status === "Hoạt động" ? "green" : "red";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Tổng chi tiêu",
    dataIndex: "spent",
    key: "spent",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button icon={<EditOutlined />} />
        <Button icon={<EyeOutlined />} />
      </Space>
    ),
  },
];
function Customers() {
  return (
    <>
          <div className="admin-customers">
            <div className="customers-header">
              <h2>Quản lý khách hàng</h2>
              <Space>
                <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                <Button type="primary" icon={<PlusOutlined />} className="add-customer-button">
                  Thêm khách hàng
                </Button>
              </Space>
            </div>
            <div className="search-bar">
              <Input placeholder="Tìm kiếm khách hàng..." prefix={<SearchOutlined />} className="search-input" />
              <Button icon={<FilterOutlined />}>Lọc</Button>
            </div>
            <Table columns={columns} dataSource={customersData} pagination={{ pageSize: 5 }} />
          </div>
    </>
  )
}

export default Customers