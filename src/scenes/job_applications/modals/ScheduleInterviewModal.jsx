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
import { tokens } from "../../../theme";
import OpenInNew from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../../data/apiConfig";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import moment, { ISO_8601 } from "moment";
import { Formik } from "formik";
import * as yup from "yup";

const getDuration = (start_time, end_time) => {
  const duration = moment.duration(moment(end_time).diff(moment(start_time)));

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  let durationString = "";

  if (days > 0) {
    durationString += `${days} day${days > 1 ? "s" : ""} `;
  }

  if (hours > 0) {
    durationString += `${hours} hour${hours > 1 ? "s" : ""} `;
  }

  if (minutes > 0) {
    durationString += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  }

  if (days + hours + minutes == 0) {
    durationString = "0 minutes";
  }

  return durationString.trim();
};

export const ScheduleInterviewModal = ({
  openDialog,
  handleClose,
  jobApplication, //needs to be passed
  onSuccess,
}) => {
  const initialValues = {
    interview_description: jobApplication.name,
    start_time: moment().format("YYYY-MM-DDTHH:mm"),
    end_time: moment().add(1, "hour").format("YYYY-MM-DDTHH:mm"), //+1 hour
  };

  console.log(initialValues);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  //handle file upload

  const handleFormSubmit = (values, onSuccess) => {
    // submitFormData(values, onSuccess);
  };

  const checkoutSchema = yup.object().shape({
    interview_description: yup.string().required("required"),
    start_time: yup.date().required("required"),
    end_time: yup
      .date()
      .required()
      .min(yup.ref("start_time"), "End date cannot be earlier than start date"),
    //TODO: to set a limit on the duration
  });

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Formik
        onSubmit={(values, { resetForm }) => {
          // handleFormSubmit(values, resetForm);
          console.log("ScheduleInterviewModal: ", values);
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">
              <Typography
                color={colors.greenAccent[400]}
                sx={{ fontSize: "h4.fontSize" }}
              >
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
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Interview Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.interview_description}
                    name="interview_description"
                    error={
                      !!touched.interview_description &&
                      !!errors.interview_description
                    }
                    helperText={
                      touched.interview_description &&
                      errors.interview_description
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="Start Time"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      console.log(e.target.value);
                      handleChange(e);
                    }}
                    value={values.start_time}
                    name="start_time"
                    error={!!touched.start_time && !!errors.start_time}
                    helperText={touched.start_time && errors.start_time}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="End Time"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.end_time}
                    name="end_time"
                    error={!!touched.end_time && !!errors.end_time}
                    helperText={touched.end_time && errors.end_time}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Typography
                    color={colors.greenAccent[300]}
                    sx={{ gridColumn: "span 2" }}
                  >
                    Interview Duration:{" "}
                    {getDuration(values.start_time, values.end_time)}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
