import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { PATH_NAME } from "../../../../constant/pathname";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../../constant/config";

const Sidebar = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    fullname: "",
    imageUrl: "",
  });

  // Gọi API để lấy thông tin user
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return; // Kiểm tra nếu chưa có userId thì không gọi API

      try {
        const response = await axios.get(`${BASE_URL}Account/get/${userId}`);
        const data = response.data;
        setUserData({
          fullName: data.fullName,
          imageUrl:
            data.imageUrl ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);
  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar-container">
        <div className="profile-sidebar-top">
          <div className="profile-sidebar-avatar">
            <img
              src={userData.imageUrl}
              alt="Avatar"
            />
          </div>
          <div className="profile-sidebar-label">Xin chào, {userData.fullName}</div>
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
