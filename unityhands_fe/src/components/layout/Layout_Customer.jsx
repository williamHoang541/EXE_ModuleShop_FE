import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar_Cus from "../navbar/Navbar_Cus";

const Layout_Customer = () => {
  return (
    <Fragment>
      <Navbar_Cus />
      <div className="content-outlet">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Layout_Customer;
