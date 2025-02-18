import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Layout, Table, Button, Input, Space, Tag, Avatar } from "antd";
import { SearchOutlined, PlusOutlined, ExportOutlined, EditOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons";
import './AddminProducts.css'
const { Content } = Layout;
function AdminProducts() {

    const productsData = [
        {
          key: "1",
          image: "/images/ban_go.jpg",
          name: "Bàn gỗ sồi",
          id: "SP001",
          price: "5,000,000 VND",
          quantity: 10,
          sales: 120,
        },
        {
          key: "2",
          image: "/images/ghe_go.jpg",
          name: "Ghế gỗ cao cấp",
          id: "SP002",
          price: "2,500,000 VND",
          quantity: 20,
          sales: 85,
        },
        {
          key: "3",
          image: "/images/tu_go.jpg",
          name: "Tủ quần áo gỗ",
          id: "SP003",
          price: "12,000,000 VND",
          quantity: 15,
          sales: 200,
        },
        {
          key: "4",
          image: "/images/giuong_go.jpg",
          name: "Giường ngủ gỗ",
          id: "SP004",
          price: "15,000,000 VND",
          quantity: 8,
          sales: 50,
        },
      ];
      
      const columns = [
        {
          title: "Sản phẩm",
          dataIndex: "image",
          key: "image",
          render: (img, record) => (
            <Space>
              <Avatar shape="square" size={50} src={img} />
              <div>
                <b>{record.name}</b>
                <p style={{ color: "gray" }}>ID: {record.id}</p>
              </div>
            </Space>
          ),
        },
        {
          title: "Giá",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Đã bán",
          dataIndex: "sales",
          key: "sales",
          render: (sales) => (
            <Space>
              <span>{sales} đơn</span>
              <Tag color={sales > 100 ? "green" : "red"}>{sales > 100 ? "Bán chạy" : "Chậm"}</Tag>
            </Space>
          ),
        },
        {
          title: "Hành động",
          key: "action",
          render: () => (
            <Space size="middle">
              <Button icon={<EditOutlined />} />
              <Button icon={<DeleteOutlined />} danger />
            </Space>
          ),
        },
      ];
  return (
    <>
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ padding: "20px" }}>
          <div className="admin-products">
            <div className="products-header">
              <h2>Quản lý sản phẩm</h2>
              <Space>
                <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                <Button type="primary" icon={<PlusOutlined />} className="add-product-button">
                  Thêm sản phẩm
                </Button>
              </Space>
            </div>
            <div className="search-bar">
              <Input placeholder="Tìm kiếm sản phẩm..." prefix={<SearchOutlined />} className="search-input" />
              <Button icon={<FilterOutlined />}>Lọc</Button>
            </div>
            <Table columns={columns} dataSource={productsData} pagination={{ pageSize: 5 }} />
          </div>
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default AdminProducts