import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { google_client_id } from "../../data/apiConfig";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginCmp from "./GoogleLogin";

const defaultTheme = createTheme();

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { login } = useAuth();

  const fetchUserProfile = (user_id, access_token) => {
    console.log("fetchUserProfile called");
    axios
      .get(
        `${hostServer}/user/${user_id}`,
        getAuthHeader({ access_token: access_token })
      )
      .then((response) => {
        console.log("profile", response.data.response);
        let roles = response.data.roles.map((e) => {
          return e.name;
        });
        login({
          user_id: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          access_token: access_token,
          role: roles[0],
          company_name: response.data.company.name,
          company_id: response.data.company.companyId,
        });
      })
      .catch((error) => {});
  };

  const handlePasswordLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(`${hostServer}/api/auth/login`, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((response) => {
        fetchUserProfile(response.data.id, response.data.accessToken);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleGoogleLogin = (id_token) => {
    console.log("handleGoogleLogin called");
    axios
      .post(`${hostServer}/api/auth/google/login`, {
        token: id_token,
      })
      .then((response) => {
        console.log("called");
        fetchUserProfile(response.data.id, response.data.accessToken);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <GoogleOAuthProvider clientId={google_client_id}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box>
              <GoogleLoginCmp handleSubmit={handleGoogleLogin} />
            </Box>
            <Box
              component="form"
              onSubmit={handlePasswordLogin}
              // noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2" color={colors.grey[100]}>
                Forgot password?
              </Link> */}
                </Grid>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
