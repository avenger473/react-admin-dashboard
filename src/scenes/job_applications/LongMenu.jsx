import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const redirect = (url, target = "_blank") => window.open(url, target);

export function LongMenu({ jobApplication, toggleModal }) {
  console.log(jobApplication);
  const options = [
    {
      label: "View CV",
      action_cb: () => redirect(jobApplication.resume_url),
    },
    {
      label: "Edit",
      action_cb: () => toggleModal("UpdateJobApplicationModal", jobApplication),
    },
    {
      label: "Schedule Interview",
      action_cb: () => toggleModal("ScheduleInterviewModal", jobApplication),
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={(_) => {
              console.log("clicked: ", option.label);
              option.action_cb();
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
