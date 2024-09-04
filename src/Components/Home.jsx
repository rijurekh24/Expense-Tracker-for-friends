import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <Box>
      <Typography>Welcome Back, {ctx.user?.name}</Typography>
      <Typography>Email: {ctx.user?.email}</Typography>
      <Button variant="outlined" onClick={handleClick}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
