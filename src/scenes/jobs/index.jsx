import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { LongMenu } from "./LongMenu";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useAuth } from "../../hooks/useAuth";

const Jobs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const [data, setData] = useState({
    loading: true,
    jobs: null,
    error: null,
  });

  let fetchJobs = () => {
    axios
      .get(`${hostServer}/job/all/?company_code=Port1451`, getAuthHeader(user))
      .then((response) => {
        setData({
          ...data,
          loading: false,
          jobs: response.data.map((e, index) => {
            return {
              ...e,
              id: index,
            };
          }),
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
    fetchJobs();
  }, []);

  console.log(data);

  const columns = [
    {
      field: "menu",
      headerName: "",
      flex: 0.2,
      renderCell: () => {
        return <LongMenu />;
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: ({ row: { title } }) => {
        return <Typography color={colors.grey[100]}>{title}</Typography>;
      },
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1.5,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "yoe",
      headerName: "Year of Experience",
      flex: 0.75,
    },
    {
      field: "education_level",
      headerName: "Education Level",
      flex: 1,
    },
    {
      field: "field_of_education",
      headerName: "Field Of Education",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="JOBS" subtitle="Create a New Job Profile" />

        <Box>
          <Link to={"/create_job"}>
            <Button
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <WorkOutlineOutlinedIcon sx={{ mr: "10px" }} />
              Create Job
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {data.loading ? (
          <Box display={"flex"} justifyContent={"center"} mt={"100px"}>
            <CircularProgress color="secondary" />
          </Box>
        ) : data.jobs ? (
          <DataGrid
            rows={data.jobs}
            columns={columns}
            rowsPerPageOptions={[5, 10, 25, 100]}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <div>{data.error}</div>
        )}
      </Box>
    </Box>
  );
};

export default Jobs;
