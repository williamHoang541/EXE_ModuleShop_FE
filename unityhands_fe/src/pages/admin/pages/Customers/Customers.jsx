import "./Customer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Table, Button, Input, Space, Tag, Avatar } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import api from "../../../../constant/axios";

const { Content } = Layout;

function Customers() {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/Account/get-all");
        const data = response.data.$values || [];

        const formattedData = data.map((item) => ({
          key: item.id.toString(),
          avatar: item.imageUrl || "/images/default-avatar.jpg",
          name: item.fullName || "Chưa có tên",
          email: item.email,
          location: item.address || "Chưa có địa chỉ",
          status: item.isActive ? "Hoạt động" : "Bị khóa",
          spent: "0 VND",
        }));

        setCustomersData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

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

  return (
    <div className="admin-customers">
      <div className="customers-header">
        <h2>Quản lý khách hàng</h2>
        
      </div>
      <div className="search-bar">
        <Input placeholder="Tìm kiếm khách hàng..." prefix={<SearchOutlined />} className="search-input" />
        <Button icon={<FilterOutlined />}>Lọc</Button>
      </div>
      <Table columns={columns} dataSource={customersData} loading={loading} pagination={{ pageSize: 5 }} />
    </div>
  );
}

export default Customers;
