import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import OpenInNew from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment";

export const ScheduleInterviewDialog = ({
  openDialog,
  handleClose,
  start_ts,
  end_ts,
  onSuccess,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  //handle file upload
  let [file, setFile] = useState(null);
  console.log(file);
  const uploadFile = (file) => {
    let formData = new FormData();
    // formData.;
    // axios
    //   .post(`${hostServer}/interview/`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${user.access_token}`,
    //     },
    //   })
    //   .then((response) => {
    //     alert(
    //       `${response.data.jobs_created_successfully} Jobs created from CSV File`
    //     );
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     alert("Error in Job Creation, Recheck your file");
    //   });
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography color={colors.greenAccent[400]}>
          Schedule Interview
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          width={"400px"}
          sx={{
            "& label.Mui-focused": {
              color: `${colors.grey[100]} !important`,
            },
            "& fieldset.Mui-focused": {
              borderColor: `${colors.grey[100]} !important`,
            },
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Interview Title"
            name="title"
            type="text"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="start_ts"
            label="Start Time"
            name="start_ts"
            type="time"
            in
            value={moment(start_ts).format("hh:mm")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="end_ts"
            label="End Time"
            name="end_ts"
            type="time"
            value={moment(end_ts).format("hh:mm")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="job_application_id"
            label="Job Application"
            name="job_application_id"
            type="text"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            uploadFile(file);
          }}
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
