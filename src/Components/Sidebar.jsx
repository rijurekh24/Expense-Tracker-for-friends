import React from "react";
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

const SIDEBAR_ITEMS = [
  { text: "Home", icon: "ic:baseline-home", path: "/" },
  { text: "Profile", icon: "gg:profile", path: "/" },
  { text: "Settings", icon: "material-symbols-light:settings", path: "/" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
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
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
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
  );
};

export default Sidebar;
