import { createContext, useState } from "react";

const authContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    user,
    setUser,
    token,
    setToken,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

export { authContext };
