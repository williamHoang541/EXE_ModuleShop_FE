import useTitle from "../../../constant/useTitle";
import "./ShoppingCart.css";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../constant/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import { FaDropbox } from "react-icons/fa";

const ShoppingCart = () => {
  const [loading, setLoading] = useState(true);
  useTitle("Giỏ hàng");

  const { userId } = useContext(AuthContext); // Lấy userId từ context

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}AddToCard/get-all`);

        const allItems = Array.isArray(response.data?.$values)
          ? response.data.$values
          : [];

        // Lọc giỏ hàng theo userId
        const userCart = allItems.filter(
          (item) => Number(item.accountId) === Number(userId)
        );

        // Gộp các sản phẩm trùng nhau
        const mergedCart = userCart.reduce((acc, item) => {
          const existingItem = acc.find(
            (cartItem) => cartItem.productId === item.productId
          );
          if (existingItem) {
            existingItem.quantity += item.quantity; // Cộng dồn số lượng
          } else {
            acc.push({ ...item }); // Thêm mới vào danh sách
          }
          return acc;
        }, []);

        // Lấy danh sách productId từ giỏ hàng
        const productIds = mergedCart.map((item) => item.productId);

        // Gọi API lấy thông tin sản phẩm
        const productResponses = await Promise.all(
          productIds.map((id) => axios.get(`${BASE_URL}Product/get/${id}`))
        );

        // Chuyển danh sách sản phẩm thành object { productId: productData }
        const productMap = productResponses.reduce((acc, res) => {
          if (res.data) {
            acc[res.data.id] = res.data;
          }
          return acc;
        }, {});

        // Cập nhật giỏ hàng với thông tin sản phẩm
        const updatedCart = mergedCart.map((item) => ({
          ...item,
          product: productMap[item.productId] || {}, // Gán thông tin sản phẩm vào
        }));

        setCartItems(updatedCart);

        // Cập nhật số lượng sản phẩm vào localStorage
        localStorage.setItem("cartCount", updatedCart.length.toString());
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const updateCartItemQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Nếu số lượng về 0 thì gọi hàm xóa sản phẩm
      removeCartItem(productId);
      return;
    }

    try {
      const payload = {
        accountId: userId, // ID của user
        products: [{ productId, quantity: newQuantity }], // Danh sách sản phẩm cần cập nhật
      };

      await axios.put(`${BASE_URL}AddToCard/update-cart`, payload);

      // Cập nhật lại giỏ hàng trên UI
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}AddToCard/delete`, {
        params: { accountId: userId },
        data: [productId], // Truyền productId cần xóa vào mảng
      });

      // Cập nhật lại giỏ hàng sau khi xóa thành công
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  if (loading) return <div className="loader"></div>;
  return (
    <div className="shopping">
      <div className="shopping-table-container">
        <h2>Giỏ hàng của bạn</h2>
        {cartItems.length > 0 ? (
          <table className="shopping-table">
            <thead>
              <tr>
                <th>Thông tin sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="shopping-info">
                      <div className="shopping-img">
                        <img
                          src={
                            item.product?.productImages?.$values[0]?.imageUrl
                          }
                          alt="Sản phẩm"
                        />
                      </div>
                      <div className="shopping-title">
                        <p>{item.product?.name}</p>
                        <button onClick={() => removeCartItem(item.productId)}>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="shopping-coin">
                      {item.product?.price
                        ? item.product.price.toLocaleString() + "₫"
                        : "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="shopping-quantity">
                      <button
                        className="shopping-minus"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        <FiMinus />
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="shopping-add"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="shopping-payment">
                     
                      {item.product?.price
                        ? (
                            item.product.price * item.quantity
                          ).toLocaleString() + "₫"
                        : "N/A"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="shopping-box-empty">
          <FaDropbox />
          <p>Giỏ hàng trống</p>
          </div>
        )}
        <div className="shopping-bottom">
          <div className="shopping-total">
            <h5>Tổng tiền:</h5>
            <p>
              {cartItems
                .reduce(
                  (total, item) => total + item.product?.price * item.quantity,
                  0
                )
                .toLocaleString()}
              ₫
            </p>
          </div>
          <Link to={PATH_NAME.PAYMENT}>
            <button className="shopping-btn">Thanh toán</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
