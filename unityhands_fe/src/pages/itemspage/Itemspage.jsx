import { useContext, useEffect, useState } from "react";
import "./Itemspage.css";
import { Select, Input, Slider } from "antd";
import useTitle from "../../constant/useTitle";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import { BsCart3 } from "react-icons/bs";
import { BASE_URL } from "../../constant/config";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const Itemspage = () => {
  useTitle("Sản phẩm");
  const [loading, setLoading] = useState(true);
  const { userId, isLoggedIn } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000000]);

  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  });

  const productApi = `${BASE_URL}Product/get-all`;
  const imageApi = `${BASE_URL}ProductImage/get-all`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, imageRes] = await Promise.all([
          axios.get(productApi),
          axios.get(imageApi),
        ]);

        if (productRes.data?.$values) {
          setProducts(productRes.data.$values);
          setFilteredProducts(productRes.data.$values);
        }
        if (imageRes.data?.$values) {
          setImages(imageRes.data.$values);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm, priceRange]);

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng");
      return;
    }

    try {
      // Lấy giỏ hàng hiện tại
      const cartResponse = await axios.get(`${BASE_URL}AddToCard/get-all`);
      const allItems = Array.isArray(cartResponse.data?.$values)
        ? cartResponse.data.$values
        : [];
      // Lọc giỏ hàng theo userId
      const userCart = allItems.filter(
        (item) => Number(item.accountId) === Number(userId)
      );

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = userCart.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const newQuantity = existingItem.quantity + 1;
        await axios.put(`${BASE_URL}AddToCard/update-cart`, {
          accountId: userId,
          products: [{ productId, quantity: newQuantity }],
        });

        // Cập nhật giỏ hàng trên UI
        setCartCount((prevCount) => prevCount + 1);
        localStorage.setItem("cartCount", (cartCount + 1).toString());
        window.dispatchEvent(new Event("storage"));
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        await axios.post(`${BASE_URL}AddToCard/add-to-cart`, {
          accountId: userId,
          products: [{ productId, quantity: 1 }],
        });

        // Cập nhật số lượng giỏ hàng trên UI

        setCartCount(cartCount + 1);
        localStorage.setItem("cartCount", (cartCount + 1).toString());
        window.dispatchEvent(new Event("storage"));

        toast.success("Đã thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  if (loading) return <div className="loader"></div>;

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
        {/* <Row gutter={[16, 16]}>
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
        </Row> */}

        <div className="items-home-product">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const productImage = images.find(
                (image) => image.productId === product.id && image.isPrimary
              );
              return (
                <div key={product.id} className="home-cart-product">
                  <div className="home-cart-img">
                    <Link
                      to={PATH_NAME.PRODUCT_DETAILS.replace(":id", product.id)}
                      className="home-cart-detail"
                    >
                      <img
                        className="home-thumbnail"
                        src={productImage.imageUrl}
                        alt={product.name}
                      />
                    </Link>
                  </div>

                  <div className="home-cart-content">
                    <div className="home-cart-label">{product.name}</div>
                    <div className="home-cart-coin">
                      {product.price.toLocaleString("vi-VN")}₫
                    </div>
                    <div className="home-cart-btn">
                      <button
                        className="home-add-cart"
                        type="submit"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
                          handleAddToCart(product.id);
                        }}
                      >
                        <BsCart3 className="home-icons" /> Thêm giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-results">Không tìm thấy sản phẩm nào</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Itemspage;
