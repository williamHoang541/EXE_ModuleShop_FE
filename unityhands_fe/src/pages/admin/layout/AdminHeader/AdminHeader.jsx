import React from "react";
import {Button, Col, Row } from "antd";
import { AlignLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import './AdminHeader.css'

function AdminHeader({ onPress }) {
  return (
    <Row style={{backgroundColor:'#936a49', width: "100%", margin: 0}} className="header-dashboard">
      <Col
        xl={1}
        lg={1}
        md={1}
        sm={1}
        xs={1}
        style={{backgroundColor:'#936a49'}}
        className="header-dashboard__header-control"
      >
          <Button
            type="link"
            className="header-dashboard__header-control__sidebar-toggler"
            onClick={onPress}
            style={{color:'white'}}
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
        style={{backgroundColor:'#936a49'}}
        className="header-dashboard__header-control dash-info"
      >
        <p className="header-dashboard__title" style={{color:'white'}}>
          Welcome to Dashboard
        </p>
      </Col>
    </Row>
  );
}

export default AdminHeader;
