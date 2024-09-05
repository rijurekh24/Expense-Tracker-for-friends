import React, { useContext } from "react";
import { Avatar, Box, Typography } from "@mui/material";
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
      <Typography
        sx={{ fontSize: "20px", color: "#7F00FF", fontWeight: "bold", mb: 2 }}
      >
        Your Friends
      </Typography>
      <Box>
        {ctx.user?.friends?.map((friend) => {
          const [firstName] = friend.name.split(" ");
          const avatarLetter = firstName
            ? firstName.charAt(0).toUpperCase()
            : "";

          return (
            <Box
              key={friend._id}
              display="flex"
              alignItems="center"
              gap={1}
              mb={1}
            >
              <Avatar sx={{ bgcolor: "#7F00FF", color: "#fff" }}>
                {avatarLetter}
              </Avatar>
              <Typography>
                {friend.name} ({friend.username})
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
