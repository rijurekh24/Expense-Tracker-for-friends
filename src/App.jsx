import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { Box } from "@mui/material";
import axios from "axios";

const AuthView = () => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("")
      .then((res) => {})
      .catch(() => {
        navigate("/signin");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return loading ? (
    <Box>Hello</Box>
  ) : (
    <Box>
      <Outlet />
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthView />}>
          <Route element={<Home />} index />
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
