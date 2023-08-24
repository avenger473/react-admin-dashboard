import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { LongMenu } from "./LongMenu";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { ScheduleInterviewModal } from "./modals/ScheduleInterviewModal";
import { UpdateJobApplicationModal } from "./modals/UpdateJobApplicationModal";
import { mockDataCandidates } from "../../data/mockData";
const JobApplication = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const [modalOpen, setModal] = useState(null);

  const closeModal = () => {
    setModal(null);
  };

  const toggleModal = (title, jobApplication) => {
    setModal({ title: title, jobApplication: jobApplication });
  };

  const [data, setData] = useState({
    loading: true,
    jobApplications: null,
    error: null,
  });

  let fetchJobApplications = () => {
    setData({ ...data, loading: false, jobApplications: mockDataCandidates });

    // axios
    //   .get(
    //     `${hostServer}/job/application/all?company_id=1`,
    //     getAuthHeader(user)
    //   )
    //   .then((response) => {
    //     setData({
    //       ...data,
    //       loading: false,
    //       jobApplications: response.data.map((e, index) => {
    //         return {
    //           id: index,
    //           name: e.candidate.name,
    //           email: e.candidate.email,
    //           position: e.job.position,
    //           application_date: moment(e.created_at).format("DD-MM-YYYY"),
    //           status: e.status,
    //           scorecard_url: e.candidate.link_to_scorecard,
    //           resume_url: e.candidate.link_to_cv,
    //           comment: e.comments,
    //         };
    //       }),
    //     });
    //   })
    //   .catch((error) => {
    //     setData({
    //       ...data,
    //       loading: false,
    //       error: error,
    //     });
    //   });
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  console.log(data);

  const columns = [
    {
      field: "menu",
      headerName: "",
      flex: 0.2,
      renderCell: ({ row: jobApplication }) => {
        return (
          <LongMenu jobApplication={jobApplication} toggleModal={toggleModal} />
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
    },
    {
      field: "application_date",
      headerName: "Application Date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="JOB APPLICATIONS"
          subtitle="Managing the Job Applications"
        />
        {modalOpen && (
          <>
            <ScheduleInterviewModal
              openDialog={modalOpen.title === "ScheduleInterviewModal"}
              jobApplication={modalOpen.jobApplication}
              handleClose={closeModal}
            />
            <UpdateJobApplicationModal
              openDialog={modalOpen.title === "UpdateJobApplicationModal"}
              jobApplication={modalOpen.jobApplication}
              handleClose={closeModal}
            />
          </>
        )}
        <Box>
          <Link to={"/dashboard/create_job"}>
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
              Create Job Application
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
        {data.jobApplications ? (
          <DataGrid
            rows={data.jobApplications}
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

export default JobApplication;
