import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import { useAuth } from "../../hooks/useAuth";

const Reporting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const [data, setData] = useState({
    loading: true,
    applications: null,
    error: null,
  });

  let fetchApplications = () => {
    axios
      .get(
        `${hostServer}/reporting/application_to_review?company_id=1`,
        getAuthHeader(user)
      )
      .then((response) => {
        setData({
          ...data,
          loading: false,
          applications: response.data.response.map((e, index) => {
            return {
              id: index,
              position: e.position,
              total_cv: e.totalCvReceived,
              cv_screening: e.cvScreening,
              chatbot_screening: e.chatbotScreening,
              interview_screening: e.interviewScreening,
              interviewed: e.interviewDone,
              hired: e.hired,
              rejected: e.rejected,
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
    fetchApplications();
  }, []);

  const columns = [
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_cv",
      headerName: "CV Received",
      flex: 1,
    },
    {
      field: "cv_screening",
      headerName: "CV Screening",
      flex: 1,
    },
    {
      field: "chatbot_screening",
      headerName: "Chatbot Screening",
      flex: 1,
    },
    {
      field: "interview_screening",
      headerName: "Interview Screening",
      flex: 1,
    },
    {
      field: "interviewed",
      headerName: "Interviewed",

      flex: 1,
    },
    {
      field: "hired",
      headerName: "Hired",
      flex: 1,
    },
    {
      field: "rejected",
      headerName: "Rejected",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="My Applications" subtitle="List of application" />
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
        {data.applications ? (
          <DataGrid
            rows={data.applications}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            rowsPerPageOptions={[5, 10, 25, 100]}
          />
        ) : (
          <Box display={"flex"} justifyContent={"center"} mt="100px">
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Reporting;
