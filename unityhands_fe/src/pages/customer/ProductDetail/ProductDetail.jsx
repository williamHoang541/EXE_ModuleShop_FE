import { BsCart3 } from "react-icons/bs";
import "./ProductDetail.css";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { FaCarSide } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../constant/config";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
const ProductDetail = () => {
  const { id } = useParams();
  const { userId, isLoggedIn } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}Product/get/${id}`);

        if (res.data) {
          setProduct(res.data);
          const productImages = res.data.productImages?.$values || [];
          const primaryImage = productImages.find((img) => img.isPrimary);
          setImage(primaryImage.imageUrl);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
        const newQuantity = existingItem.quantity + quantity;
        await axios.put(`${BASE_URL}AddToCard/update-cart`, {
          accountId: userId,
          products: [{ productId, quantity: newQuantity }],
        });

        // Cập nhật giỏ hàng trên UI
        setCartCount((prevCount) => prevCount + quantity);
        localStorage.setItem("cartCount", (cartCount + 1).toString());
        window.dispatchEvent(new Event("storage"));
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        await axios.post(`${BASE_URL}AddToCard/add-to-cart`, {
          accountId: userId,
          products: [{ productId, quantity }],
        });

        // Cập nhật số lượng giỏ hàng trên UI

        setCartCount(cartCount + quantity);
        localStorage.setItem("cartCount", (cartCount + quantity).toString());
        window.dispatchEvent(new Event("storage"));

        toast.success("Đã thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  if (!product) return <div className="loader"></div>;

  if (loading) return <div className="loader"></div>;
  return (
    <div className="product-detail">
      <h1>Thông tin chi tiết</h1>
      <div className="product-detail-container">
        <div className="product-detail-thumbnail">
          <img src={image} alt={product.name} className="product-detail-img" />
        </div>
        <div className="product-detail-content">
          <div className="product-detail-top">
            <h2>{product.name}</h2>
            <p>
              <strong>Mã sản phẩm:</strong> {product.id}
            </p>
            <div className="product-detial-coin">
              {product.price.toLocaleString("vi-VN")}₫
            </div>
          </div>

          <div className="product-detail-middle">
            <p>
              <strong>Kích thước:</strong> {product.dimensions}
            </p>
            <p>
              <strong>Chất liệu:</strong>
              {product.materialType}
            </p>
            <p>
              <strong>Bảo hành:</strong> 2 năm, bảo trì trọn đời.
            </p>
            <p>
              <strong>Số lượng:</strong>{" "}
              {product.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
            </p>
            <div className="product-detail-count">
              <CiCircleMinus
                className="product-detail-icons"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              />
              <p>{quantity}</p>
              <IoIosAddCircleOutline
                className="product-detail-icons"
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>

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

          <div className="product-detail-bottom">
            <h3>Quyền lợi & chính sách</h3>
            <div className="product-detail-text">
              <div className="product-detail-1">
                <MdOutlineSwapHorizontalCircle className="product-detail-icon-1" />{" "}
                7 ngày hoàn trả miễn phí
              </div>
              <div className="product-detail-1">
                <GoShieldCheck className="product-detail-icon-1" /> Bảo hành
                trong 12 tháng
              </div>
              <div className="product-detail-1">
                <FaCarSide className="product-detail-icon-1" /> Miễn phí vận
                chuyển
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
