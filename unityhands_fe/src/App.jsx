import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/admin/Login/Login";
import Register from "./pages/admin/Register/Register";
import ForgotPassword from "./pages/admin/ForgotPassword/ForgotPassword";
import NewPassword from "./pages/admin/NewPassword/NewPassword";
import Itemspage from "./pages/itemspage/Itemspage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/customer/Home/Home";
import Layout_Customer from "./components/layout/Layout_Customer";
import ProductDetail from "./pages/customer/ProductDetail/ProductDetail";
import MainDashboard from "./pages/admin/layout/MainDashboard/MainDashboard";
import AdminProducts from "./pages/admin/pages/AdminProducts/AdminProducts";
import Customers from "./pages/admin/pages/Customers/Customers";
import AdminOrders from "./pages/admin/pages/AdminOrders/AdminOrders";
import Dashboard from "./pages/admin/pages/AdminDashboard/Dashboard";
import AdminCategory from "./pages/admin/pages/AdminCategory/AdminCategory";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH_NAME.LOGIN} element={<Login />} />
        <Route path={PATH_NAME.REGISTER} element={<Register />} />
        <Route path={PATH_NAME.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH_NAME.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH_NAME.ITEMS} element={<Itemspage />} />
        <Route path={PATH_NAME.ABOUT_US} element={<AboutUs />} />
        <Route path={PATH_NAME.CONTACT_US} element={<ContactUs />} />

        <Route  element={<MainDashboard />}>
          <Route path={PATH_NAME.DASH_BOARD} element={<Dashboard />} /> 
          <Route path={PATH_NAME.ADMIN_CATEGORY} element={<AdminCategory />} /> 
          <Route path={PATH_NAME.ADMIN_PRODUCTS} element={<AdminProducts />} />
          <Route path={PATH_NAME.ADMIN_ORDERS} element={<AdminOrders />} />
          <Route path={PATH_NAME.ADMIN_CUSTOMERS} element={<Customers />} />
        </Route>

        <Route element={<Layout_Customer />}>
          <Route path={PATH_NAME.HOME} element={<Home />} />
          <Route path={PATH_NAME.PRODUCT_DETAILS} element={<ProductDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
