import { createContext, useState } from "react";
import Api from "../Utils/api";

const authContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchDetails = () => {
    Api.get("/verify/account/me").then((res) => {
      setUser(res.data.user);
    });
  };
  const value = {
    user,
    setUser,
    token,
    setToken,
    fetchDetails,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

export { authContext };
