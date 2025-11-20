import React, { useContext } from "react";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Login from "./pages/Login";
import Order from "./pages/Order";
import List from "./pages/List";

import { Routes, Route } from "react-router-dom";
import { adminDataContext } from "./context/AdminContext";

const App = () => {
  const { adminData } = useContext(adminDataContext);
  return (
    <>
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/lists" element={<List />} />
        </Routes>
      )}
    </>
  );
};

export default App;
