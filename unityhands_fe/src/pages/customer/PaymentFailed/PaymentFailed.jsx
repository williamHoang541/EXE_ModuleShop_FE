import { Result, Button, Typography, Space } from "antd";
import {
  CloseCircleFilled,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;


const PaymentFailed = () => {
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
          status="error"
          icon={
            <CloseCircleFilled style={{ color: "#ff4d4f", fontSize: "72px" }} />
          }
          title={
            <Title level={2} style={{ color: "#ff4d4f" }}>
              Thanh toán thất bại
            </Title>
          }
          subTitle={
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Paragraph>
                Rất tiếc, giao dịch của bạn không thể hoàn tất. Vui lòng kiểm
                tra lại thông tin thanh toán và thử lại.
              </Paragraph>
            </Space>
          }
          extra={[
            <Button
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              key="home"
            >
              Về trang chủ
            </Button>,
            <Button
              type="link"
              icon={<QuestionCircleOutlined />}
              onClick={() => navigate("/help")}
              key="help"
            >
              Cần hỗ trợ?
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentFailed;