import { useState, useEffect } from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockDataProfile } from "../../../data/mockData";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../../data/apiConfig";
import ProfileForm from "./ProfileForm";
import { useAuth } from "../../../hooks/useAuth";

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const [data, setData] = useState({
    loading: true,
    profile: null,
    error: null,
  });

  let fetchUserProfile = () => {
    axios
      .get(`${hostServer}/user/1`, getAuthHeader(user))
      .then((response) => {
        setData({
          ...data,
          loading: false,
          profile: {
            name: response.data.name,
            email: response.data.email,
            country: response.data.country,
            mobile: response.data.mobile,
            companyName: response.data.company.name,
          },
        });
      })
      .catch((error) => {
        setData({
          ...data,
          loading: false,
          error: error,
        });
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Box m="20px">
      <Header title="PROFILE" subtitle="" />
      <Box m="40px 0 0 0">
        {data.loading ? (
          <Box display={"flex"} justifyContent={"center"} mt={"100px"}>
            <CircularProgress color="secondary" />
          </Box>
        ) : data.profile ? (
          <ProfileForm profile={data.profile} />
        ) : (
          <div>{data.error}</div>
        )}
      </Box>
    </Box>
  );
};

export default Form;
