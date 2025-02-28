import "./Account.css";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import useTitle from "../../../../constant/useTitle";

const Account = () => {
  useTitle("Hồ sơ của bạn");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Văn Vinh");
  const [email, setEmail] = useState("vanvinh@example.com");
  const [address, setAddress] = useState("Hà Nội, Việt Nam");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
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
              <div className="profile-sidebar-avatar">
                <img
                  src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-dep-cho-nam-2.jpg"
                  alt="avatar"
                />
              </div>

              <div className="account-details">
                {/* Họ tên */}
                <div className="account-field">
                  <label>Họ tên:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="account-input"
                    />
                  ) : (
                    <span>{name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="account-field">
                  <label>Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="account-input"
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                </div>

                {/* Địa chỉ */}
                <div className="account-field">
                  <label>Địa chỉ:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="account-input"
                    />
                  ) : (
                    <span>{address}</span>
                  )}
                </div>
              </div>
              <div className="account-actions">
                {isEditing ? (
                  <button className="save-button" onClick={handleSaveClick}>
                    Lưu
                  </button>
                ) : (
                  <button className="edit-button" onClick={handleEditClick}>
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
