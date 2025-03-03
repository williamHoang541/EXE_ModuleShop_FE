import { Layout, Drawer } from "antd";
import "./MainDashboard.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar"; 
import AdminHeader from "../AdminHeader/AdminHeader";

const { Content, Sider, Header } = Layout;

function MainDashboard() {
  const [visible, setVisible] = useState(false);

  return (
    <Layout className="layout-dashboard">
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={280}
        className="drawer-sidebar"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <Sidebar />
      </Drawer>

      <Header className="header-dashboard">
        <AdminHeader onMenuClick={() => setVisible(!visible)} />
      </Header>

      <Layout>
        <Sider
          width={280}
          className="sider-dashboard"
          style={{ backgroundColor: "transparent", transition: "all 0.5s ease-out" }}
        >
          <Sidebar />
        </Sider>

        <Layout>
          <Content className="main-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainDashboard;
