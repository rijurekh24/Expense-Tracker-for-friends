import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import GroupCard from "./GroupCard";
import CreateGroupModal from "../Modal/CreateGroupModal";

const GroupList = () => {
  const ctx = useContext(authContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    ctx.fetchDetails();
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#7F00FF",
          mb: 2,
          "&:hover": {
            bgcolor: "#7F00FF",
          },
        }}
        onClick={handleOpen}
      >
        Create New Group
      </Button>
      <CreateGroupModal open={modalOpen} handleClose={handleClose} />

      <Box display={"flex"} gap={3}>
        {ctx.user?.groups.map((g, key) => (
          <GroupCard details={g.group_id} key={key} />
        ))}
      </Box>
    </Box>
  );
};

export default GroupList;
