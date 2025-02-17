import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/admin/Login/Login";
import Register from "./pages/admin/Register/Register";
import ForgotPassword from "./pages/admin/ForgotPassword/ForgotPassword";
import NewPassword from "./pages/admin/NewPassword/NewPassword";
import OTPAuth from "./pages/admin/OTPAuth/OTPAuth";
import Home from "./pages/customer/Home/Home";
import Layout_Customer from "./components/layout/Layout_Customer";
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path={PATH_NAME.HOMEPAGE} element={<Homepage />} /> */}
        <Route path={PATH_NAME.LOGIN} element={<Login />} />
        <Route path={PATH_NAME.REGISTER} element={<Register />} />
        <Route path={PATH_NAME.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH_NAME.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH_NAME.OTP_AUTHENTICATION} element={<OTPAuth />} />


        <Route element={<Layout_Customer />}>
        <Route path={PATH_NAME.HOME} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
