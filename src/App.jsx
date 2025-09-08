import { Spin } from "antd";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/context/auth.context";
import Header from "./components/layout/header";
import './styles/products.css';
import axios from "./util/axios.customize";


function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;