import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header: Adminheader } = Layout;

function AdminHeader() {
  return (
    <>
      <Adminheader className="admin-header">
        <div className="header-right">
          <Avatar icon={<UserOutlined />} />
        </div>
      </Adminheader>
    </>
  );
}

export default AdminHeader;
