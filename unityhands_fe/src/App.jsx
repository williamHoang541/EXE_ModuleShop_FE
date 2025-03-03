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
import ShoppingCart from "./pages/customer/Shopping_cart/ShoppingCart";
import Payment from "./pages/customer/Payment/Payment";
import Account from "./pages/customer/Profile/account/Account";
import Order from "./pages/customer/Profile/order/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer
        limit={1} // Chỉ hiển thị tối đa 1 toast
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        
      />
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

        <Route path={PATH_NAME.DASH_BOARD} element={<Dashboard />} />
        <Route path={PATH_NAME.PRODUCTS} element={<AdminProducts />} />
        <Route path={PATH_NAME.ORDERS} element={<AdminOrders />} />
        <Route path={PATH_NAME.CUSTOMERS} element={<Customers />} />

        <Route element={<Layout_Customer />}>
          <Route path={PATH_NAME.HOME} element={<Home />} />
          <Route path={PATH_NAME.PRODUCT_DETAILS} element={<ProductDetail />} />
          <Route path={PATH_NAME.CONTACT_US} element={<ContactUs />} />
          <Route path={PATH_NAME.ITEMS} element={<Itemspage />} />
          <Route path={PATH_NAME.ABOUT_US} element={<AboutUs />} />
          <Route path={PATH_NAME.SHOPPING_CARTS} element={<ShoppingCart />} />
          <Route path={PATH_NAME.PAYMENT} element={<Payment />} />
          <Route path={PATH_NAME.ACCOUNT} element={<Account />} />
          <Route path={PATH_NAME.ORDER} element={<Order />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
