import "./Account.css";
import Sidebar from "../sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import useTitle from "../../../../constant/useTitle";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../../constant/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  useTitle("Hồ sơ của bạn");
  const { userId } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    address: "",
    imageUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return; // Kiểm tra nếu chưa có userId thì không gọi API

      try {
        const response = await axios.get(`${BASE_URL}Account/get/${userId}`);
        const data = response.data;
        setUserData({
          fullName: data.fullName || "Chưa cập nhật",
          email: data.email || "Chưa có email",
          address: data.address || "Chưa có địa chỉ",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Hiển thị ảnh ngay lập tức
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("FullName", userData.fullName);
    formData.append("Email", userData.email);
    formData.append("Address", userData.address);
    if (selectedFile) {
      formData.append("ImageUrl", selectedFile); // Upload ảnh nếu có
    }

    try {
      await axios.put(`${BASE_URL}Account/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cập nhật thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      window.location.reload(); // Load lại trang sau khi cập nhật
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
      toast.error("Cập nhật thất bại!");
    }

    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (isEditing) {
      document.getElementById("fileInput").click(); // Kích hoạt input file ẩn
    }
  };

  return (
    <div className="account">
      <section className="account-wrapper">
        <h2>Hồ sơ của bạn</h2>
        <div className="account-row">
          <div className="account-left">
            <Sidebar />
          </div>

          <div className="account-right">
            <div className="account-title">
              <h3>Trang tài khoản</h3>
            </div>
            <div className="account-infor">
              <div
                className="profile-sidebar-avatar"
                onClick={handleImageClick}
                style={{ cursor: isEditing ? "pointer" : "default" }}
              >
                <img src={userData.imageUrl} alt="avatar" />
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }} // Ẩn input file
                  onChange={handleFileChange}
                />
              </div>

              <div className="account-details">
                {/* Họ tên */}
                <div className="account-field">
                  <label>Họ tên:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.fullName}
                      onChange={(e) =>
                        setUserData({ ...userData, fullName: e.target.value })
                      }
                      className="account-input"
                    />
                  ) : (
                    <span>{userData.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="account-field">
                  <label>Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className="account-input"
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>

                {/* Địa chỉ */}
                <div className="account-field">
                  <label>Địa chỉ:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      className="account-input"
                    />
                  ) : (
                    <span>{userData.address}</span>
                  )}
                </div>
              </div>
              <div className="account-actions">
                {isEditing ? (
                  <button className="save-button" onClick={handleSaveClick}>
                    Lưu
                  </button>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
