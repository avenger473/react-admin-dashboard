import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInterviews } from "../../data/mockData";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const redirect = (url, target = "_blank") => window.open(url, target);
const LongMenu = ({ resume_url, scorecard_url }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const options = [
    {
      label: "View CV",
      action_cb: () => redirect(resume_url),
    },
    {
      label: "View Scorecard",
      action_cb: () => redirect(scorecard_url),
    },
    { label: "Edit", action_cb: () => console.log("Edit") },
    { label: "View Profile", action_cb: () => console.log("View Profile") },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    option.action_cb();
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "25ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={(_) => handleSelect(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const Activities = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      field: "location",
      headerName: "Location",
      flex: 1,
      renderCell: ({ row: { interview_details } }) => {
        return (
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {interview_details.location}
          </Typography>
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
      <DataGrid
        disableRowSelectionOnClick={true}
        rows={mockDataInterviews}
        columns={columns}
      />
    </Box>
  );
};

export default Activities;
