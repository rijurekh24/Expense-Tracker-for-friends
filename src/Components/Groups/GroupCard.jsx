import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ details }) => {
  return (
    <Box
      sx={{
        boxShadow: 4,
        width: "200px",
        height: "100px",
        textAlign: "center",
        cursor: "pointer",
        textDecoration: "none",
      }}
      component={Link}
      to={`/group/${details?._id}`}
    >
      <Typography sx={{ fontSize: "18px" }}>{details?.name}</Typography>
      <Box>
        {details?.members.map((m, key) => (
          <li key={key}>{m?.user_id?.name}</li>
        ))}
      </Box>
    </Box>
  );
};

export default GroupCard;
