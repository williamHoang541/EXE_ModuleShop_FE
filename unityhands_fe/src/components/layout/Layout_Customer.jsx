import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar_Cus from "../navbar/Navbar_Cus";
import Footer from "../footer/Footer";
import "./Layout.css"

const Layout_Customer = () => {
  return (
    <Fragment>
      <Navbar_Cus />
      <div className="layout-container">
      <div className="content-outlet">
        <Outlet />
      </div>
      <Footer/>
      </div>
    </Fragment>
  );
};

export default Layout_Customer;
