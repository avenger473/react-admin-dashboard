import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useState } from "react";
import { CSVUploadDialog } from "./CSVUploadDialog";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

function getArrayfromString(str) {
  return str.split(",").map((word) => word.trim());
}

const CreateJobForm = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  let submitFormData = (data, onSuccess) => {
    axios
      .post(
        `${hostServer}/job/`,
        {
          title: data.jobTitle,
          description: data.jobDescription,
          position: data.position,
          required_skills: getArrayfromString(data.skillsRequired),
          yoe: data.yearOfExperience,
          location: data.location,
          education_level: data.educationLevel,
          field_of_education: data.educationField,
          company_id: 1,
        },
        getAuthHeader(user)
      )
      .then((response) => {
        onSuccess();
        alert(`New Job Added with Job Code: ${response.data.job_code}`);
      })
      .catch((error) => {
        alert("Try Again!");
      });
  };

  const handleFormSubmit = (values, onSuccess) => {
    submitFormData(values, onSuccess);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box m="20px">
      <CSVUploadDialog openDialog={openDialog} handleClose={handleClose} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CREATE JOB" subtitle="Create a New Job Profile" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              handleClickOpen();
            }}
          >
            <UploadFileOutlinedIcon sx={{ mr: "10px" }} />
            Import Job from CSV
          </Button>
        </Box>
      </Box>
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobTitle}
                name="jobTitle"
                error={!!touched.jobTitle && !!errors.jobTitle}
                helperText={touched.jobTitle && errors.jobTitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="filled"
                type="text"
                label="Job Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobDescription}
                name="jobDescription"
                error={!!touched.jobDescription && !!errors.jobDescription}
                helperText={touched.jobDescription && errors.jobDescription}
                sx={{ gridColumn: "span 2", gridRowStart: "2" }}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Skills"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Ex: Excel, Python, Analytics. Use comma seperated values"
                value={values.skillsRequired}
                name="skillsRequired"
                error={!!touched.skillsRequired && !!errors.skillsRequired}
                helperText={touched.skillsRequired && errors.skillsRequired}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Ex: New Delhi, India"
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                fullWidth
                error={!!touched.educationField && !!errors.educationField}
              >
                <InputLabel id="education-field-label">
                  Field of Education
                </InputLabel>
                <Select
                  labelId="education-field-label"
                  id="education-field"
                  value={values.educationField}
                  label="Field of Education"
                  name="educationField"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <b>None</b>
                  </MenuItem>
                  {jobApplicationFieldsValues.map((field) => {
                    return <MenuItem value={field}>{field}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                fullWidth
                error={!!touched.yearOfExperience && !!errors.yearOfExperience}
              >
                <InputLabel id="yearOfExperience-label">
                  Years of Education{" "}
                </InputLabel>
                <Select
                  labelId="yearOfExperience-label"
                  id="yearOfExperience"
                  value={values.yearOfExperience}
                  label="Years of Education"
                  name="yearOfExperience"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <b>None</b>
                  </MenuItem>
                  {yearsOfExperienceValues.map((field) => {
                    return <MenuItem value={field}>{field}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                fullWidth
                error={!!touched.educationLevel && !!errors.educationLevel}
              >
                <InputLabel id="education-level-label">
                  Education Level
                </InputLabel>
                <Select
                  labelId="education-level-label"
                  id="education-level"
                  value={values.educationLevel}
                  label="Education Level"
                  name="educationLevel"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <b>None</b>
                  </MenuItem>
                  {educationLevelValues.map((field) => {
                    return <MenuItem value={field}>{field}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="start" mt="40px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Create New Job
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  jobTitle: yup.string().required("required"),
  jobDescription: yup.string().required("required"),
  position: yup.string().required("required"),
  skillsRequired: yup.string().required("required"),
  yearOfExperience: yup.string().required("required"),
  educationLevel: yup.string().required("required"),
  educationField: yup.string().required("required"),
});
const initialValues = {
  jobTitle: "",
  jobDescription: "",
  position: "",
  skillsRequired: "",
  yearOfExperience: "",
  educationLevel: "",
  educationField: "",
  location: "",
};

const jobApplicationFieldsValues = [
  "Management",
  "Marketing",
  "Engineering",
  "MassCommunication",
];

const yearsOfExperienceValues = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "11-15 years",
  "16-20 years",
  "More than 20 years",
];

const educationLevelValues = [
  "HighSchool",
  "Intermediate",
  "Diploma",
  "Bachelors",
  "Masters",
  "Doctorate",
];

export default CreateJobForm;
