import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataCandidates } from "../../data/mockData";
import Header from "../../components/Header";

const Candidates = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid rows={mockDataCandidates} columns={columns} />
      </Box>
    </Box>
  );
};

export default Candidates;
