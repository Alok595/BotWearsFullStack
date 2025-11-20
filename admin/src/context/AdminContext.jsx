import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthProvider";
import axios from "axios";

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
  let [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentAdmin = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getcurrentadmin", {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setAdminData(null);
    }
  };

  useEffect(() => {
    getCurrentAdmin();
  }, []);

  let value = { adminData, setAdminData, getCurrentAdmin };
  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;
