import React, { createContext } from "react";
export const authDataContext = createContext();
const AuthProvider = ({ children }) => {
  let serverUrl = "https://botwearsfullstack-backend.onrender.com";

  const value = { serverUrl };
  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthProvider;
