import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { AlignLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import "./AdminHeader.css";
import { AuthContext } from "../../../../context/AuthContext";
import api from "../../../../constant/axios";

function AdminHeader({ onPress }) {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    fullName: "",
    role: "",
  });
  // Gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return; // Kiểm tra nếu chưa có userId thì không gọi API

      try {
        const response = await api.get(`/Account/get/${userId}`);
        const data = response.data;
        setUserData({
          fullName: data.fullName || "Chưa cập nhật",
          role: data.role,
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);
  return (
    <Row
      style={{ backgroundColor: "#936a49", width: "100%", margin: 0 }}
      className="header-dashboard"
    >
      <Col
        xl={1}
        lg={1}
        md={1}
        sm={1}
        xs={1}
        style={{ backgroundColor: "#936a49" }}
        className="header-dashboard__header-control"
      >
        <Button
          type="link"
          className="header-dashboard__header-control__sidebar-toggler"
          onClick={onPress}
          style={{ color: "white" }}
        >
          <AlignLeftOutlined />
        </Button>
      </Col>
      <Col
        xl={23}
        lg={23}
        md={23}
        sm={23}
        xs={23}
        style={{ backgroundColor: "#936a49" }}
        className="header-dashboard__header-control dash-info"
      >
        <p className="header-dashboard__title" style={{ color: "white" }}>
          Hi {userData.role} Welcome to Dashboard
        </p>
      </Col>
    </Row>
  );
}

export default AdminHeader;
