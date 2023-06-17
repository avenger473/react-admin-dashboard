import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { LongMenu } from "./LongMenu";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostServer } from "../../data/apiConfig";
import moment from "moment";

const Activities = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({
    loading: true,
    interviews: null,
    error: null,
  });

  let fetchApplicationsTrend = () => {
    axios
      .get(`${hostServer}/interview/all?user_id=1`)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          interviews: response.data.map((e, index) => {
            return {
              id: index,
              name: e.candidate.name,
              email: e.candidate.email,
              interview_details: {
                position: e.jobApplication.job.position,
                date: moment(e.start_ts).format("DD-MM-YYYY"),
                start_time: moment(e.start_ts).format("hh:mm:a"),
                end_time: moment(e.end_ts).format("hh:mm:a"),
              },
              scorecard_url: null,
              resume_url: e.candidate.link_to_cv,
              comment: e.jobApplication.comment,
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

  const columns = [
    {
      field: "menu",
      headerName: "",
      flex: 0.2,
      renderCell: ({ row: { resume_url, scorecard_url } }) => {
        return (
          <LongMenu resume_url={resume_url} scorecard_url={scorecard_url} />
        );
      },
    },
    {
      field: "applicant",
      headerName: "Applicant",
      flex: 1,
      renderCell: ({ row: { name, email } }) => {
        return (
          <Box>
            <Typography color={colors.grey[100]}>{name}</Typography>
            <Typography color={colors.blueAccent[200]}>{email}</Typography>
          </Box>
        );
      },
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      renderCell: ({ row: { interview_details } }) => {
        return (
          <Typography color={colors.grey[100]}>
            {interview_details.position}
          </Typography>
        );
      },
    },
    {
      field: "interviewSchedule",
      headerName: "Interview Date & Time",
      flex: 1,
      renderCell: ({ row: { interview_details } }) => {
        return (
          <Box>
            <Typography color={colors.grey[100]}>
              {interview_details.date}
            </Typography>
            <Typography color={colors.blueAccent[200]}>
              {`${interview_details.start_time} - ${interview_details.end_time}`}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
  ];

  return (
    <Box
      height="360px"
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
      {data.interviews ? (
        <DataGrid
          disableRowSelectionOnClick={true}
          rows={data.interviews}
          columns={columns}
        />
      ) : (
        <Box display={"flex"} justifyContent={"center"} mt="100px">
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default Activities;
