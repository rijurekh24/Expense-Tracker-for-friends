import React, { useContext, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Search from "./Search";
import { authContext } from "../Context/AuthContext";
import CreateGroupModal from "./Modal/CreateGroupModal";

const Home = () => {
  const ctx = useContext(authContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: "30px" }}>
          Welcome, Mr. {ctx.user?.name}
        </Typography>
        <Search />
      </Box>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Group
      </Button>
      <CreateGroupModal open={modalOpen} handleClose={handleClose} />
    </Box>
  );
};

export default Home;
