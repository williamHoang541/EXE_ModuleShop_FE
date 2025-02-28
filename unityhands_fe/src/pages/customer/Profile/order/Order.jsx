import "./Order.css";
import Sidebar from "../sidebar/Sidebar";
import useTitle from "../../../../constant/useTitle";

const Order = () => {
  useTitle("Đơn hàng của bạn");
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
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Đơn hàng</th>
                    <th>Địa chỉ</th>
                    <th>Ngày</th>
                    <th>Giá trị đơn hàng</th>
                    <th>TT thanh toán</th>
                    <th>TT vận chuyển</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1234</td>
                    <td>Quận 2, HCM</td>
                    <td>20/02/2025</td>
                    <td>9.000.000₫</td>
                    <td className="not-pay">Chưa thanh toán</td>
                    <td>Chưa vận chuyển</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
