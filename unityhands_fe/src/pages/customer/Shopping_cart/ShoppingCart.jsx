import useTitle from "../../../constant/useTitle";
import "./ShoppingCart.css";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

const ShoppingCart = () => {
  useTitle("Giỏ hàng");
  return (
    <div className="shopping">
      <div className="shopping-table-container">
        <h2>Giỏ hàng của bạn</h2>
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
            <tr>
              <td>
                <div className="shopping-info">
                  <div className="shopping-img">
                    <img
                      src="https://bizweb.dktcdn.net/100/501/740/products/1-a2ce9601-2b45-4ed0-b64e-e27e38bf817d.jpg?v=1701328440557"
                      alt=""
                    />
                  </div>
                  <div className="shopping-title">
                    <p>Tủ quần áo Đa năng Giá rẻ</p>
                    <button>Xóa</button>
                  </div>
                </div>
              </td>
              <td>
                <div className="shopping-coin">9.500₫</div>
              </td>
              <td>
                <div className="shopping-quantity">
                  <button className="shopping-minus">
                    <FiMinus />
                  </button>
                  <p>1</p>
                  <button className="shopping-add">
                    <IoMdAdd />
                  </button>
                </div>
              </td>
              <td>
                <div className="shopping-payment">9.500₫</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="shopping-bottom">
          <div className="shopping-total">
            <h5>Tổng tiền:</h5>
            <p>9.500₫</p>
          </div>
          <button className="shopping-btn">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
