import { Result, Button, Typography, Space } from "antd";
import {
  CheckCircleFilled,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Result
          status="success"
          icon={
            <CheckCircleFilled style={{ color: "#52c41a", fontSize: "72px" }} />
          }
          title={
            <Title level={2} style={{ color: "#52c41a" }}>
              Thanh toán thành công!
            </Title>
          }
          subTitle={
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Paragraph>
                Cảm ơn bạn đã thanh toán. Giao dịch của bạn đã được xác nhận!
              </Paragraph>

              <Paragraph>
                Chúng tôi đã gửi thông tin xác nhận vào email của bạn. Bạn có
                thể theo dõi đơn hàng trong mục Lịch sử đơn hàng.
              </Paragraph>
            </Space>
          }
          extra={[
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              key="home"
            >
              Về trang chủ
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;