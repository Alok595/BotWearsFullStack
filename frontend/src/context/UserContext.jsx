import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import { useEffect } from "react";
export const userDataContext = createContext();
const UserContext = ({ children }) => {
  let { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState("");

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });
      console.log(result.data);
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = { userData, setUserData, getCurrentUser };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
