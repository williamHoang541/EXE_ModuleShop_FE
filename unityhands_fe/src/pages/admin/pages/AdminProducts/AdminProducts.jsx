import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Avatar,
  message,
  Modal,
  Form,
  InputNumber,
  Switch,
  Upload,
  Select,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./AddminProducts.css";
import api from "../../../../constant/axios";

const { Content } = Layout;

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const [dimensions, setDimensions] = useState({
    length: null,
    width: null,
    height: null,
  });
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm] = Form.useForm();

  //API calling methods
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [productRes, imageRes] = await Promise.all([
        api.get("/Product/get-all"),
        api.get("/ProductImage/get-all"),
      ]);
  
      const imageMap = imageRes.data.$values.reduce((acc, image) => {
        acc[image.productId] = image.imageUrl; // Lưu ảnh theo productId
        return acc;
      }, {});
  
      const productsData = productRes.data.$values.map((product) => ({
        key: product.id,
        id: product.id,
        name: product.name,
        dimensions: product.dimensions,
        weight: product.weight,
        price: `${product.price.toLocaleString()} VND`,
        quantity: product.stockQuantity,
        material: product.materialType,
        image: imageMap[product.id] || "/items/do_go_1.jpg", // Dùng ảnh từ API hoặc ảnh mặc định
      }));
  
      setProducts(productsData);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu sản phẩm!");
    }
    setLoading(false);
  };
  

  const fetchCategory = async () => {
    try {
      const response = await api.get("/Category/get-all");
      setCategory(response.data.$values);
    } catch (error) {
      message.error("Lỗi khi tải danh mục!");
    }
  };

  const handleAddProduct = async (values) => {
    const formData = new FormData();

    formData.append("CategoryId", values.CategoryId);
    formData.append("Name", values.Name);
    formData.append("Description", values.Description);
    formData.append("Price", values.Price);
    formData.append("CostPrice", values.CostPrice);
    formData.append("Dimensions", values.Dimensions);
    formData.append("Weight", values.Weight);
    formData.append("MaterialType", values.MaterialType);
    formData.append("IsCustomizable", values.IsCustomizable);
    formData.append("StockQuantity", values.StockQuantity);
    formData.append("MinStockLevel", values.MinStockLevel);
    formData.append("IsPrimary", values.IsPrimary);

    if (values.ImageUrl && values.ImageUrl.fileList.length > 0) {
      values.ImageUrl.fileList.forEach((file) => {
        formData.append("ImageUrl", file.originFileObj);
      });
    }

    try {
      const response = await api.post("/Product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("Thêm sản phẩm thành công!");
        fetchProducts();
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Thêm sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      message.error("Lỗi khi thêm sản phẩm!");
    }
  };

  const handleDeleteProduct = async (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await api.delete(`/Product/delete/${id}`);
          if (response.status === 200) {
            message.success("Xóa sản phẩm thành công!");
            fetchProducts();
          } else {
            message.error("Xóa sản phẩm thất bại!");
          }
        } catch (error) {
          console.error("Lỗi API:", error.response?.data || error.message);
          message.error("Lỗi khi xóa sản phẩm!");
        }
      },
    });
  };

  const handleDimensionChange = (value, type) => {
    setDimensions((prev) => ({ ...prev, [type]: value }));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalVisible(true);

    // Đổ dữ liệu sản phẩm vào form
    editForm.setFieldsValue({
      CategoryId: product.categoryId,
      Name: product.name,
      Description: product.description,
      Price: product.price,
      CostPrice: product.costPrice,
      Weight: product.weight,
      MaterialType: product.materialType,
      StockQuantity: product.stockQuantity,
      MinStockLevel: product.minStockLevel,
      IsCustomizable: product.isCustomizable,
      IsPrimary: product.isPrimary,
    });
  };

  const handleUpdateProduct = async (values) => {
    const formData = new FormData();

    formData.append("CategoryId", values.CategoryId);
    formData.append("Name", values.Name);
    formData.append("Description", values.Description);
    formData.append("Price", values.Price);
    formData.append("CostPrice", values.CostPrice);
    formData.append("Weight", values.Weight);
    formData.append("MaterialType", values.MaterialType);
    formData.append("IsCustomizable", values.IsCustomizable);
    formData.append("StockQuantity", values.StockQuantity);
    formData.append("MinStockLevel", values.MinStockLevel);
    formData.append("IsPrimary", values.IsPrimary);

    // Nếu có ảnh mới, gửi ảnh lên API
    if (values.ImageUrl && values.ImageUrl.fileList.length > 0) {
      values.ImageUrl.fileList.forEach((file) => {
        formData.append("ImageUrl", file.originFileObj);
      });
    }

    try {
      const response = await api.put(
        `/Product/update/${editingProduct.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        message.success("Cập nhật sản phẩm thành công!");
        fetchProducts(); // Cập nhật lại danh sách
        setIsEditModalVisible(false);
        setEditingProduct(null);
        editForm.resetFields();
      } else {
        message.error("Cập nhật sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      message.error("Lỗi khi cập nhật sản phẩm!");
    }
  };

  //Use API
  useEffect(() => {
    fetchCategory();
    fetchProducts();
    form.setFieldsValue({
      Dimensions: `Dài ${dimensions.length || 0}cm x Rộng ${
        dimensions.width || 0
      }cm x Cao ${dimensions.height || 0}cm`,
    });
  }, []);

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
      title: "Kích thước",
      dataIndex: "dimensions",
      key: "dimensions",
    },
    {
      title: "Cân nặng (kg)",
      dataIndex: "weight" ,
      key: "weight",
    },
    {
      title: "Chất liệu",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteProduct(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="admin-products">
        <div className="products-header">
          <h2>Quản lý sản phẩm</h2>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Thêm sản phẩm
            </Button>
          </Space>
        </div>
        <div className="search-bar">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
          <Button icon={<FilterOutlined />}>Lọc</Button>
        </div>
        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <Modal
        title="Thêm sản phẩm mới"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="CategoryId"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select placeholder="Chọn danh mục">
              {category.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="Description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Kích thước">
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item name="length" noStyle>
                  <InputNumber
                    min={0}
                    placeholder="Dài (cm)"
                    style={{ width: "100%" }}
                    onChange={(value) => handleDimensionChange(value, "length")}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="width" noStyle>
                  <InputNumber
                    min={0}
                    placeholder="Rộng (cm)"
                    style={{ width: "100%" }}
                    onChange={(value) => handleDimensionChange(value, "width")}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="height" noStyle>
                  <InputNumber
                    min={0}
                    placeholder="Cao (cm)"
                    style={{ width: "100%" }}
                    onChange={(value) => handleDimensionChange(value, "height")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="Dimensions" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="Price" label="Giá bán" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="CostPrice" label="Giá nhập">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="Weight" label="Trọng lượng">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="MaterialType" label="Chất liệu">
            <Input />
          </Form.Item>

          <Form.Item name="StockQuantity" label="Số lượng">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="MinStockLevel" label="Số lượng tối thiểu">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="IsCustomizable"
            label="Có thể tùy chỉnh"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="IsPrimary"
            label="Sản phẩm chính"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="ImageUrl" label="Hình ảnh">
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa sản phẩm"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingProduct(null);
        }}
        onOk={() => editForm.submit()}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateProduct}>
          <Form.Item
            name="CategoryId"
            label="Danh mục"
            rules={[{ required: true }]}
          >
            <Select>
              {category.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="Description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="Price" label="Giá bán" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="CostPrice" label="Giá nhập">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="Weight" label="Trọng lượng">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="MaterialType" label="Chất liệu">
            <Input />
          </Form.Item>

          <Form.Item name="StockQuantity" label="Số lượng">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="MinStockLevel" label="Số lượng tối thiểu">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="IsCustomizable"
            label="Có thể tùy chỉnh"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="IsPrimary"
            label="Sản phẩm chính"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="ImageUrl" label="Hình ảnh">
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {editingProduct?.imageUrl && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={editingProduct.imageUrl}
                  alt="Ảnh sản phẩm"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AdminProducts;
