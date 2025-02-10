import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/admin/Login/Login";
import Register from "./pages/admin/Register/Register";
import Homepage from "./pages/homepage/Homepage";
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path={PATH_NAME.HOMEPAGE} element={<Homepage />} /> */}
        <Route path={PATH_NAME.LOGIN} element={<Login />} />
        <Route path={PATH_NAME.REGISTER} element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
