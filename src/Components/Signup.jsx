import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Container,
  Grid,
  Input,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../Utils/api";
export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [mailError, setMailError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!data.name) newErrors.name = "Name is required";

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Valid email is required";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      Api.post("/users/register", {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          setMailError(err?.response?.data?.message);
        });
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
          Create your new account
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
            name="username"
            placeholder="Enter username"
            value={data.username}
            onChange={handleChange}
            sx={{ mt: 3 }}
          />
          <Input
            required
            fullWidth
            name="name"
            placeholder="Enter name"
            value={data.name}
            onChange={handleChange}
            sx={{ mt: 3 }}
          />
          {errors.name && <Typography color="error">{errors.name}</Typography>}

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
            <Typography color="error">{errors.email}</Typography>
          )}

          {mailError && <Typography color="error">{mailError}</Typography>}

          <Grid container spacing={2}>
            <Grid item xs={6}>
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
              {errors.password && (
                <Typography color="error">{errors.password}</Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Input
                required
                fullWidth
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
                sx={{ mt: 3 }}
              />
              {errors.confirmPassword && (
                <Typography color="error">{errors.confirmPassword}</Typography>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/signin"
            variant="body2"
            sx={{
              fontWeight: "medium",
              textDecoration: "underline",
              ":hover": { color: "primary.main" },
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
