import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataApplications } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <DataGrid
          rows={mockDataApplications}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
