import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const FriendList = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
      pl={1}
      pr={2}
      width={"100%"}
    >
      <Box display={"flex"} gap={1} alignItems={"center"} width={"100%"}>
        {props.dp ? (
          <Avatar
            src={props.dp}
            sx={{
              borderRadius: "20px",
              color: "#fff",
              color: "#7F00FF",
              width: 40,
              height: 40,
            }}
          ></Avatar>
        ) : (
          <Avatar
            sx={{
              borderRadius: "20px",
              color: "#fff",
              bgcolor: "#7F00FF",
              width: 40,
              height: 40,
            }}
          >
            {props.name.charAt(0)}
          </Avatar>
        )}
        <Box>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "textColor.secondary",
            }}
          >
            @{props.username}
          </Typography>
          <Typography sx={{ cursor: "pointer", fontSize: "0.9rem" }}>
            {props.name}
          </Typography>
        </Box>

        <Icon
          icon={"mdi:account-check"}
          color="#7F00FF"
          width={23}
          height={23}
          onClick={props.onUnfollow}
          style={{
            cursor: "pointer",
            marginLeft: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default FriendList;
