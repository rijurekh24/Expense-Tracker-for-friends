import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, InputBase } from "@mui/material";
import { authContext } from "../../Context/AuthContext";
import FriendList from "../FriendList";
import Api from "../../Utils/api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  bgcolor: "#fff",
  boxShadow: 24,
  color: "textColor.main",
  border: "2px solid #333",
  py: 2,
  "&:focus": {
    outline: "none",
  },
};

const FriendsModal = ({ open, onClose }) => {
  const ctx = useContext(authContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFollowers = ctx.user?.friends.filter((follower) => {
    const fullName = `${follower.name}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUnfollow = (id) => {
    Api.post("/get/add-friend", { userId: ctx.user._id, friendId: id })
      .then((res) => {
        console.log(res);
        ctx.fetchDetails();
      })
      .catch((error) => {
        console.error("Error sending friend request:", error.response);
      });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} width={{ xs: 450 }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              fontSize: "1.2rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            Friends
            <Divider
              sx={{
                maxWidth: "100%",
                backgroundColor: "#fff",
                margin: "10px auto 10px auto",
                color: "#fff",
              }}
            />
          </Typography>
          <InputBase
            placeholder="Search"
            fullWidth
            sx={{ px: 2, color: "textColor.secondary", mb: 2 }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Box
            width={"100%"}
            sx={{
              overflowY: "scroll",
              position: "sticky",
              height: 250,
              "&::-webkit-scrollbar-track": {
                backgroundColor: "backgroundColor.main",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
              },
              "&::-webkit-scrollbar": {
                width: "0px",
              },
            }}
          >
            {filteredFollowers.map((item, index) => (
              <FriendList
                key={index}
                name={item.name}
                username={item.username}
                onUnfollow={() => handleUnfollow(item.friend_id)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FriendsModal;
