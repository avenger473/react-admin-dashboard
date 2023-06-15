import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const redirect = (url, target = "_blank") => window.open(url, target);
export const LongMenu = ({ resume_url, scorecard_url }) => {
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
