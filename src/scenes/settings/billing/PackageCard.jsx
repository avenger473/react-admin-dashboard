import * as React from "react";
import {
  Box,
  Button,
  useTheme,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../../theme";

const options = ["Renew Anually"];

export function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        PaperProps={{
          style: {
            width: "25ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default function PackageCard({ isActive = false }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="300px" sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ bgcolor: colors.primary[400] }}>
        <CardContent>
          <Typography variant="h4">Silver</Typography>
          <Box mt="20px" display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5">Renew Monthly</Typography>
            <Typography
              variant="h3"
              color={"secondary"}
              sx={{ fontWeight: 600 }}
            >
              $45
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {isActive ? (
            <Button size="small" color="secondary">
              Cancel Subscription
            </Button>
          ) : (
            <Button size="small" color="secondary">
              Update Plan
            </Button>
          )}
          <LongMenu />
        </CardActions>
      </Card>
    </Box>
  );
}
