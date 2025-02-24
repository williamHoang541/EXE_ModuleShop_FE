import React, { useState } from "react";
import "./Itemspage.css";
import { Card, Col, Row, Select, Input, Slider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import useTitle from "../../constant/useTitle";

const { Option } = Select;

const products = [
  {
    id: 1,
    name: "Bàn gỗ sồi",
    category: "Bàn",
    price: 5000000,
    image: "../../../public/items/ban_go_soi.jpg",
  },
  {
    id: 2,
    name: "Ghế gỗ cao cấp",
    category: "Ghế",
    price: 2000000,
    image: "../../../public/items/ghe_go_cao_cap.jpg",
  },
  {
    id: 3,
    name: "Tủ quần áo gỗ",
    category: "Tủ",
    price: 8000000,
    image: "../../../public/items/do_go_1.jpg",
  },
  {
    id: 4,
    name: "Giường ngủ gỗ",
    category: "Giường",
    price: 12000000,
    image: "../../../public/items/do_go_2.jpg",
  },
  {
    id: 5,
    name: "Kệ tivi gỗ",
    category: "Kệ",
    price: 4500000,
    image: "../../../public/items/do_go_3.jpg",
  },
  {
    id: 6,
    name: "Kệ tivi gỗ",
    category: "Kệ",
    price: 4500000,
    image: "../../../public/items/do_go_3.jpg",
  },
  {
    id: 7,
    name: "Kệ tivi gỗ",
    category: "Kệ",
    price: 4500000,
    image: "../../../public/items/do_go_3.jpg",
  },
  {
    id: 8,
    name: "Kệ tivi gỗ",
    category: "Kệ",
    price: 4500000,
    image: "../../../public/items/do_go_3.jpg",
  },
];

function Itemspage() {
  useTitle("Sản phẩm");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 15000000]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, selectedCategory, priceRange);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    filterProducts(searchTerm, value === "Tất cả" ? null : value, priceRange);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    filterProducts(searchTerm, selectedCategory, value);
  };

  const filterProducts = (search, category, price) => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category ? product.category === category : true) &&
        product.price >= price[0] &&
        product.price <= price[1]
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="itemspage-container">
        <p className="swiper__title">Sản phẩm</p>
        <div className="filters">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <Select
            placeholder="Chọn danh mục"
            allowClear
            onChange={handleCategoryChange}
            className="category-select"
          >
            <Option value={null}>Tất cả</Option>
            <Option value="Bàn">Bàn</Option>
            <Option value="Ghế">Ghế</Option>
            <Option value="Tủ">Tủ</Option>
            <Option value="Giường">Giường</Option>
            <Option value="Kệ">Kệ</Option>
          </Select>
          <Slider
            range
            min={0}
            max={15000000}
            step={500000}
            defaultValue={priceRange}
            onChange={handlePriceChange}
            className="price-slider"
          />
        </div>
        <Row gutter={[16, 16]}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.image}
                      className="product-image"
                    />
                  }
                >
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      {product.price.toLocaleString()} VND
                    </p>
                  </div>

                  {/* Nút Thêm vào giỏ hàng */}
                  <button className="add-to-cart-btn">
                    <ShoppingCartOutlined className="cart-icon" />
                    Thêm vào giỏ
                  </button>
                </Card>
              </Col>
            ))
          ) : (
            <p className="no-results">Không tìm thấy sản phẩm nào</p>
          )}
        </Row>
      </div>
    </>
  );
}

export default Itemspage;
