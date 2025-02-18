import './Dashboard.css'
import { Layout, Card, Col, Row, Statistic } from "antd";
import { ShoppingCartOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from '../../../components/sidebar/Sidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import { Content } from 'antd/es/layout/layout';
function Dashboard() {
  return (
    <>
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminHeader />  
        <Content style={{ padding: "20px" }}>
        <div className="dashboard">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic title="Doanh thu hôm nay" value={50000000} prefix={<DollarOutlined />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Tổng đơn hàng" value={120} prefix={<ShoppingCartOutlined />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Khách hàng mới" value={25} prefix={<UserOutlined />} />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default Dashboard