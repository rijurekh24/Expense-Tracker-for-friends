import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";

const Home = () => {
  const ctx = useContext(authContext);

  return (
    <Box>
      <Typography>Welcome Back, {ctx.user?.name}</Typography>
      <Typography>Email: {ctx.user?.email}</Typography>
    </Box>
  );
};

export default Home;
