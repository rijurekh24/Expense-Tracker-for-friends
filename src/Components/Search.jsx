import React, { useContext, useState } from "react";
import {
  Autocomplete,
  Box,
  InputBase,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import Api from "../Utils/api";
import { Icon } from "@iconify/react";
import { authContext } from "../Context/AuthContext";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const ctx = useContext(authContext);
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    if (value.trim() !== "") {
      setIsFetching(true);
      Api.post("/get/users", { query: value })
        .then((response) => {
          console.log(response.data);
          setSearchResult(response.data);
        })
        .catch((error) => {
          console.error("Error:", error.response);
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setSearchResult([]);
    }
  };

  const handleSendRequest = (id) => {
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
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchInput ? searchResult : []}
      ListboxProps={{
        sx: {
          maxHeight: 300,
          padding: 0,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        },
      }}
      getOptionLabel={(option) => `${option.username} (${option.name})`}
      renderOption={(props, option) => (
        <Link
          //   to={`/profile/${option.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            {...props}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box width="100%">
              <Typography
                sx={{ color: "#7F00FF" }}
              >{` @${option.username}`}</Typography>
              <Typography
                sx={{ color: "#666", display: "inline" }}
              >{`${option.name}`}</Typography>
            </Box>

            {ctx.user.username !== option.username ? (
              <Icon
                icon={
                  ctx.user.friends.some(
                    (friend) => friend.friend_id === option._id
                  )
                    ? "mdi:account-check"
                    : "fluent-mdl2:add-friend"
                }
                color="#7F00FF"
                width={23}
                height={23}
                onClick={() =>
                  !ctx.user.friends.some(
                    (friend) => friend._id === option._id
                  ) && handleSendRequest(option._id)
                }
                style={{ cursor: "pointer" }}
              />
            ) : (
              <></>
            )}
          </Box>
        </Link>
      )}
      freeSolo={searchInput?.length ? false : true}
      noOptionsText={
        isFetching ? (
          <Box width="100%" textAlign="center">
            <CircularProgress size={20} sx={{ color: "white" }} />
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography color="#7F00FF">No matches...</Typography>
          </Box>
        )
      }
      PaperComponent={({ children }) => (
        <Paper
          sx={{
            backgroundColor: "rgba(200,200,200,0.1)",
            borderRadius: "0px",
            marginTop: "2%",
            backdropFilter: "blur(15px)",
            "&:hover": {
              borderRadius: "0px",
              backgroundColor: "white",
            },
          }}
        >
          {children}
        </Paper>
      )}
      sx={{ width: 300 }}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <Box position="relative">
            <InputBase
              {...params.InputProps}
              {...rest}
              id="search-input"
              value={searchInput}
              onChange={handleChange}
              placeholder="Search"
              sx={{
                boxShadow: 2,
                width: { xs: "100%", md: "90%" },
                padding: "4px 20px 4px 20px",
                borderRadius: "15px",
                color: "#7F00FF",
                fontSize: "0.9rem",
              }}
            />
          </Box>
        );
      }}
    />
  );
};

export default Search;
