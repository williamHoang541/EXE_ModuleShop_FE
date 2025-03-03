import './Sidebar.css'
import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, ShoppingCartOutlined, UserOutlined, ShopOutlined, LogoutOutlined, BarsOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;
function Sidebar() {
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
        <Menu.Item key="home" icon={<LogoutOutlined />}>
          <Link to="/">Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    </>
  )
}

export default Sidebar