import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import Api from "../../Utils/api";

const CreateGroupModal = ({ open, handleClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const ctx = useContext(authContext);
  const friendsList = ctx?.user?.friends;

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredFriends(
      friendsList
        .filter((friend) => friend.name.toLowerCase().includes(lowercasedQuery))
        .filter(
          (friend) =>
            !selectedFriends.some((f) => f.friend_id === friend.friend_id)
        )
    );
    setShowResults(lowercasedQuery.trim().length > 0);
  }, [searchQuery, selectedFriends]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddFriend = (friend) => {
    setSelectedFriends([...selectedFriends, friend]);
  };

  const handleRemoveFriend = (friend) => {
    setSelectedFriends(
      selectedFriends.filter((f) => f.friend_id !== friend.friend_id)
    );
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const handleSubmit = () => {
    Api.post("/groups/create", {
      name: groupName,
      members: selectedFriends.map((f) => f.friend_id),
      _id: ctx?.user?._id,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    ctx.fetchDetails();
    handleClose();
    setGroupName("");
    setSelectedFriends([]);
    setSearchQuery("");
    setFilteredFriends([]);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          padding: 3,
          backgroundColor: "white",
          margin: "auto",
          marginTop: "10%",
          position: "relative",
        }}
      >
        <h2 id="create-group-modal">Create Group</h2>
        <TextField
          fullWidth
          label="Group Name"
          variant="standard"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Search Friends"
          variant="standard"
          value={searchQuery}
          onChange={handleSearch}
          margin="normal"
        />

        {showResults && (
          <Box
            sx={{
              boxShadow: 1,
              borderRadius: 1,
              maxHeight: 200,
              overflowY: "auto",
              position: "relative",
              padding: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  pl: 1,
                }}
              >
                Search Results
              </Typography>
              <IconButton onClick={handleCloseResults}>
                <Icon icon="mdi:close" color="red" />
              </IconButton>
            </Box>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, key) => (
                <ListItem
                  key={friend.friend_id}
                  secondaryAction={
                    <IconButton onClick={() => handleAddFriend(friend)}>
                      <Icon icon="mdi:plus-circle" color="green" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={friend.name} />
                </ListItem>
              ))
            ) : (
              <Box p={2}>
                <Typography>No results found</Typography>
              </Box>
            )}
          </Box>
        )}

        {selectedFriends.length > 0 ? <h3>Selected Friends</h3> : ""}

        <List>
          {selectedFriends.map((friend) => (
            <ListItem
              key={friend.friend_id}
              secondaryAction={
                <IconButton onClick={() => handleRemoveFriend(friend)}>
                  <Icon icon="mdi:minus-circle" color="red" />
                </IconButton>
              }
            >
              <ListItemText primary={friend.name} />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#7F00FF",
            "&:hover": {
              bgcolor: "#7F00FF",
            },
          }}
          onClick={handleSubmit}
        >
          Create Group
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateGroupModal;
