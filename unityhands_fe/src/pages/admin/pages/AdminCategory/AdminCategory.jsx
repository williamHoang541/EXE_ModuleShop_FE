import { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./AdminCategory.css";
import api from "../../../../constant/axios";

function AdminCategory() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await api.get("/Category/get-all");
      setCategory(response.data.$values);
    } catch (error) {
      message.error("Lỗi khi tải danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-category">
      <div className="category-header">
        <h2>Quản lý danh mục</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm danh mục
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={category}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default AdminCategory;
