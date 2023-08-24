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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../../theme";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../../data/apiConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Formik } from "formik";
import * as yup from "yup";

export const UpdateJobApplicationModal = ({
  openDialog,
  handleClose,
  jobApplication, //needs to be passed
  onSuccess,
}) => {
  const initialValues = {
    candidate_name: jobApplication.name,
    position: jobApplication.position,
    status: jobApplication.status,
    comment: jobApplication.comment,
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const handleFormSubmit = (values, onSuccess) => {
    console.log("handleFormSubmit: ", values);
    axios
      .post(
        `${hostServer}/job/application/update`,
        {
          company_id: user.company_id, //TODO get company id
          candidate_name: values.name,
          position: values.position,
          status: values.status,
          comment: values.comment,
        },
        getAuthHeader(user)
      )
      .then((response) => {
        onSuccess();
      })
      .catch((error) => {
        alert("Plese retry!!!");
      });
  };

  const checkoutSchema = yup.object().shape({
    candidate_name: yup.string().required("required"),
    position: yup.string().required("required"),
    status: yup.string().required("required"),
    comment: yup.string().required("required"),
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
          handleFormSubmit(values, resetForm);
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
                Update Job Application
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
                    label="Candidate Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.candidate_name}
                    name="candidate_name"
                    error={!!touched.candidate_name && !!errors.candidate_name}
                    helperText={touched.candidate_name && errors.candidate_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Position"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.position}
                    name="position"
                    error={!!touched.position && !!errors.position}
                    helperText={touched.position && errors.position}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                    fullWidth
                    error={!!touched.status && !!errors.status}
                  >
                    <InputLabel id="application-status-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="application-status-label"
                      id="education-level"
                      value={values.status}
                      label="Status"
                      name="status"
                      onChange={handleChange}
                    >
                      {applicationStatus.map((field) => {
                        return (
                          <MenuItem key="field" value={field}>
                            {field}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.comment}
                    multiline={true}
                    name="comment"
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                    sx={{ gridColumn: "span 2" }}
                  />
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

const applicationStatus = [
  "CV Received",
  "CV Screening",
  "Chatbot Screening",
  "Interview Screening",
  "Interviewed",
  "Hired",
  "Rejected",
];
