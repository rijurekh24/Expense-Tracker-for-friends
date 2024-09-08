import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FriendList = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
      px={1}
    >
      <Box display={"flex"} gap={1} alignItems={"center"}>
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
      </Box>
    </Box>
  );
};

export default FriendList;
