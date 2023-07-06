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
import { hostServer } from "../../data/apiConfig";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const CSVUploadDialog = ({ openDialog, handleClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  //handle file upload
  let [file, setFile] = useState(null);
  console.log(file);
  const uploadFile = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${hostServer}/job/import_from_csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        alert(
          `${response.data.jobs_created_successfully} Jobs created from CSV File`
        );
        handleClose();
      })
      .catch((error) => {
        alert("Error in Job Creation, Recheck your file");
      });
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
          {"Upload CSV to Add Jobs"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography sx={{ mb: "10px" }} color={colors.grey[400]}>
            Follow the format, Check here
            <IconButton
              aria-label="Download Smaple CSV"
              component="a"
              href="../../assets/bulk_job_template.csv"
              size="small"
              color={colors.grey[400]}
            >
              <OpenInNew />
            </IconButton>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="file"
            label=""
            name="jobTitle"
            onChange={(e) => setFile(e.target.files[0])}
            sx={{ width: "400px" }}
            componentsProps={{
              multiple: true,
            }}
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
          disabled={!file}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
