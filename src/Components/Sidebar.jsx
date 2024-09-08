import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import FriendsModal from "./Modal/FriendsModal"; // Ensure this import is correct

const SIDEBAR_ITEMS = [
  { text: "Home", icon: "ic:baseline-home", path: "/" },
  { text: "Friends", icon: "fa-solid:user-friends", path: "/" },
  { text: "Groups", icon: "grommet-icons:group", path: "/" },
  { text: "Profile", icon: "gg:profile", path: "/" },
  { text: "Settings", icon: "material-symbols-light:settings", path: "/" },
];

const Sidebar = () => {
  const [isFriendsModalOpen, setFriendsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path, itemText) => {
    if (itemText === "Friends") {
      setFriendsModalOpen(true); // Open the Friends modal
    } else {
      navigate(path); // Navigate for other items
    }
  };

  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{
            flex: "1 1 auto",
            overflowY: "auto",
          }}
        >
          {SIDEBAR_ITEMS.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleClick(item.path, item.text)}
            >
              <ListItemIcon>
                <Icon icon={item.icon} color="#7F00FF" width={23} height={23} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            flexShrink: 0,
          }}
        >
          <ListItem button onClick={() => navigate("/Signin")}>
            <ListItemIcon>
              <Icon
                icon="ic:outline-exit-to-app"
                color="#7F00FF"
                width={23}
                height={23}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Friends Modal */}
      <FriendsModal
        open={isFriendsModalOpen}
        onClose={() => setFriendsModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
