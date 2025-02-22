import { FaMap, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_wrapper">
        <div className="footer_container">
          <h3>Thông tin liên hệ</h3>
          <h4>Công ty cổ phần Module Furniture</h4>
          <div className="footer_item">
            <FaMap />
            <p className="footer_item_content">FPT University Hồ Chí Minh</p>
          </div>
          <div className="footer_item">
            <FaPhoneAlt />
            <p className="footer_item_content">1800.6789</p>
          </div>
          <div className="footer_item">
            <IoMdMail />
            <p className="footer_item_content">support@module.vn</p>
          </div>
        </div>

        <div className="footer_container">
          <h3>Chăm sóc khách hàng</h3>
          <p className="footer_item_content">
            Thời gian hỗ trợ 24/7 không kể ngày lễ
          </p>
          <h3>Thời gian hoạt động</h3>
          <p className="footer_item_content">Thứ 2 - Thứ 6: 8:00 - 21:00</p>
          <p className="footer_item_content">Thứ 7 - Chủ nhật: 8:00 - 16:00</p>
        </div>


        <div className="footer_container">
          <h3>Hướng dẫn</h3>
          <div className="footer_link_container">
            <a href="#" className="footer_link">
              Chính sách mua bán
            </a>
            <a href="#" className="footer_link">
              Chính sách bảo mật
            </a>
            <a href="#" className="footer_link">
              Quy định đối với người mua hàng
            </a>
            <a href="#" className="footer_link">
              Hướng dẫn mua hàng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
