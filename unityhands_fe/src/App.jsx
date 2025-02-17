import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/admin/Login/Login";
import Register from "./pages/admin/Register/Register";
import ForgotPassword from "./pages/admin/ForgotPassword/ForgotPassword";
import NewPassword from "./pages/admin/NewPassword/NewPassword";
import OTPAuth from "./pages/admin/OTPAuth/OTPAuth";
import Homepage from "./pages/homepage/Homepage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH_NAME.HOMEPAGE} element={<Homepage />} />
        <Route path={PATH_NAME.LOGIN} element={<Login />} />
        <Route path={PATH_NAME.REGISTER} element={<Register />} />
        <Route path={PATH_NAME.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH_NAME.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH_NAME.OTP_AUTHENTICATION} element={<OTPAuth />} />
        <Route path={PATH_NAME.ITEMS} element={<OTPAuth />} />
      </Routes>
    </div>
  );
};

export default App;
