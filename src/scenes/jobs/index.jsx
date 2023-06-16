import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataJobs } from "../../data/mockData";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { LongMenu } from "./LongMenu";
import axios from "axios";
import { hostServer } from "../../data/apiConfig";
import moment from "moment";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const Jobs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({
    loading: true,
    candidates: null,
    error: null,
  });

  let fetchApplicationsTrend = () => {
    axios
      .get(`${hostServer}/job/application/all?company_id=1`)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          candidates: response.data.map((e, index) => {
            return {
              id: index,
              name: e.candidate.name,
              email: e.candidate.email,
              position: e.job.position,
              application_date: moment(e.created_at).format("DD-MM-YYYY"),
              status: e.status,
              scorecard_url: e.candidate.link_to_scorecard,
              resume_url: e.candidate.link_to_cv,
              comment: e.comments,
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
    fetchApplicationsTrend();
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
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "yoe",
      headerName: "Year of Experience",
      flex: 1,
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
                backgroundColor: colors.greenAccent[700],
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
        }}
      >
        <DataGrid rows={mockDataJobs} columns={columns} />
        {/* {data.candidates ? (
        ) : (
          <div>Loading...</div>
        )} */}
      </Box>
    </Box>
  );
};

export default Jobs;
