import { createContext, useState, useEffect } from "react";
import axiosInstance from "../config/axiosSetup";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosInstance.get("/api/auth/me").then((res) => {
        console.log(res.data);
      setUserData(res.data);
    });
  }, []);

  const hasRole = (roleName) => {
    if (!userData?.roles) {
      return false;
    }
    return userData?.roles.some((role) => role.name === roleName);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};
