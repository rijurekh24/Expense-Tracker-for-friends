import React, { useContext, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Search from "./Search";
import { authContext } from "../Context/AuthContext";

const Home = () => {
  const ctx = useContext(authContext);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: "30px" }}>
          Welcome, Mr. {ctx.user?.name}
        </Typography>
        <Search />
      </Box>
    </Box>
  );
};

export default Home;
