import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Container,
  Input,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../Context/AuthContext";
import Api from "../Utils/api";
export default function Signin() {
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginErr, setLoginErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      Api.post("/auth/signin", {
        email: data.email,
        password: data.password,
      }).then((res) => {
        navigate("/", { replace: true });
      }).catch = (err) => {
        const errorMessage =
          err.response && err.response.data.message
            ? err.response.data.message
            : "An error occurred. Please try again.";
        setLoginErr(errorMessage);
      };
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
          width: "550px",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign in to your account
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 3, width: "100%" }}
          onSubmit={handleSubmit}
        >
          <Input
            required
            fullWidth
            name="email"
            placeholder="Enter email"
            value={data.email}
            onChange={handleChange}
            sx={{ mt: 3 }}
          />
          {errors.email && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errors.email}
            </Typography>
          )}

          <Input
            required
            fullWidth
            name="password"
            type="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={handleChange}
            sx={{ mt: 3 }}
          />
          {/* {errors.password && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errors.password}
            </Typography>
          )} */}

          {loginErr && (
            <Typography color="error" sx={{ mt: 1 }}>
              {loginErr}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Don&apos;t have an account?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            variant="body2"
            sx={{
              fontWeight: "medium",
              textDecoration: "underline",
              ":hover": { color: "primary.main" },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
