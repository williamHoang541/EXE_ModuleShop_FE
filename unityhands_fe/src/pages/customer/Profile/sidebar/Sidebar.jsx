import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { PATH_NAME } from "../../../../constant/pathname";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar-container">
        <div className="profile-sidebar-top">
          <div className="profile-sidebar-avatar">
            <img
              src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-dep-cho-nam-2.jpg"
              alt=""
            />
          </div>
          <div className="profile-sidebar-label">Xin chào, Nguyễn Văn A</div>
        </div>
        <div className="profile-sidebar-bottom">
          <ul>
            <li
              className={
                location.pathname === PATH_NAME.ACCOUNT ? "active" : ""
              }
            >
              <NavLink to={PATH_NAME.ACCOUNT}>
                <MdAccountCircle className="icon" /> Thông tin tài khoản
              </NavLink>
            </li>
            <li
              className={location.pathname === PATH_NAME.ORDER ? "active" : ""}
            >
              <NavLink to={PATH_NAME.ORDER}>
                <BsFillBoxSeamFill className="icon" /> Đơn hàng của bạn
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
