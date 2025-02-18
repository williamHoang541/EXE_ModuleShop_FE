import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

function AdminHeader() {
    
  return (
    <>
    <Header className="admin-header">
      <div className="header-right">
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
    </>
  )
}

export default AdminHeader