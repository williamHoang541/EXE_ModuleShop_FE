import "./Sidebar.css";
import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  BarsOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

const { Sider } = Layout;
function Sidebar() {
  const navigate = useNavigate();
  const { logout, userId } = useContext(AuthContext); // Lấy `logout` từ context

  const handleLogout = () => {
    if (!userId) {
      toast.error("Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    console.log("User ID before logout:", userId);
    logout(); // Gọi hàm logout từ AuthContext

    toast.success("Bạn đã đăng xuất thành công!", {
      position: "top-right",
      autoClose: 1000,
    });

    navigate("/"); // Chuyển hướng về trang chủ
  };
  return (
    <>
      <Sider width={250} className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="category" icon={<BarsOutlined />}>
            <Link to="/admin/category">Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<ShopOutlined />}>
            <Link to="/admin/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/orders">Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="customers" icon={<UserOutlined />}>
            <Link to="/admin/customers">Khách hàng</Link>
          </Menu.Item>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            <Link to="/admin/mail">Thư</Link>
          </Menu.Item>
          <Menu.Item key="home" icon={<LogoutOutlined />} onClick={handleLogout}>
            <Link to="/">Đăng xuất</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}

export default Sidebar;
