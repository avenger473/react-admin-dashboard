import { Box,  useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataApplications } from "../../data/mockData";


const ApplicationReview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "interview_screening",
      headerName: "Interview Screening",
      flex: 1,
    },
    {
      field: "chatbot_screening",
      headerName: "Chatbot Screening",
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
      <DataGrid
        disableRowSelectionOnClick={true}
        rows={mockDataApplications}
        columns={columns}
      />
    </Box>
  );
};

export default ApplicationReview;
