import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
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
      <ul>
        {ctx.user?.friends?.map((friend, key) => (
          <li key={key}>{friend.name}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Home;
