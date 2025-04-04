import { createContext, useContext, useState } from "react";
import decode from "../utils/decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? decode(token) : null);

  const login = (token) => {
    const decodedUser = decode(token);
    setToken(token);
    setUser(decodedUser);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
