import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Home from "./Components/Home";
import LoadingPage from "./Components/Loader";
import { Box, CssBaseline } from "@mui/material";
import { authContext } from "./Context/AuthContext";
import Api from "./Utils/api";
import Sidebar from "./Components/Sidebar";
import GroupPage from "./Components/Groups/GroupPage";
import GroupList from "./Components/Groups/GroupList";
const AuthView = () => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const ctx = useContext(authContext);

  useEffect(() => {
    Api.get("/verify/account/me")
      .then((res) => {
        ctx.setUser(res.data.user);
        console.log(res.data.user);
        navigate("/");
      })
      .catch(() => {
        navigate("/signin");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthView />}>
          <Route element={<Home />} index />
          <Route path="/groups" element={<GroupList />} />
          <Route path="group/:_id" element={<GroupPage />} />
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
