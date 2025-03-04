import "./Order.css";
import Sidebar from "../sidebar/Sidebar";
import useTitle from "../../../../constant/useTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../../constant/config";

const Order = () => {
  useTitle("Đơn hàng của bạn");
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}Order/get-all`)
      .then((response) => {
        // Lọc đơn hàng theo userId
        const filteredOrders = response.data.$values.filter(
          (order) => Number(order.accountId) === Number(userId)
        );
        console.log("Filtered Orders:", filteredOrders);
        setOrders(filteredOrders);
      })
      .catch((error) => console.error("Lỗi fetch đơn hàng:", error))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="order">
      <section className="order-wrapper">
        <h2>Đơn hàng</h2>
        <div className="order-row">
          <div className="order-left">
            <Sidebar />
          </div>
          <div className="order-right">
            <div className="order-title">
              <h3>Đơn hàng của bạn</h3>
            </div>
            <div className="order-table-container">
            {loading ? (
              <div className="loader"></div>
              ) : orders.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
              ) : (
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Đơn hàng</th>
                      <th>Địa chỉ</th>
                      <th>Ngày</th>
                      <th>Giá trị đơn hàng</th>
                      <th>TT thanh toán</th>
                      <th>TT vận chuyển</th>
                      <th>Phương thức</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.shippingAddress}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{(order.totalAmount).toLocaleString()}₫</td>
                        <td className={order.paymentStatus === "waiting for deliver" ? "not-pay" : ""}>
                          {order.paymentStatus === "waiting for deliver" ? "Chưa thanh toán" : order.paymentStatus}
                        </td>
                        <td>{order.status === "waiting" ? "Chờ vận chuyển" : order.status}</td>
                        <td>{order.paymentMethod === "cod" ? "COD" : order.paymentMethod === "online payment" ? "Chuyển khoản" : order.paymentMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
