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
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
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
          >
            <UploadFileOutlinedIcon sx={{ mr: "10px" }} />
            Import Job from CSV
          </Button>
        </Box>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
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
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
              }}
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
                value={values.lastName}
                name="jobDescription"
                error={!!touched.jobDescription && !!errors.jobDescription}
                helperText={touched.jobDescription && errors.jobDescription}
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
                    return (
                      <MenuItem value={field.toLowerCase()}>{field}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                fullWidth
                error={!!touched.experience && !!errors.experience}
              >
                <InputLabel id="experience-label">
                  Years of Education{" "}
                </InputLabel>
                <Select
                  labelId="experience-label"
                  id="experience"
                  value={values.experience}
                  label="Years of Education"
                  name="experience"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <b>None</b>
                  </MenuItem>
                  {yearsOfExperienceValues.map((field) => {
                    return (
                      <MenuItem value={field.toLowerCase()}>{field}</MenuItem>
                    );
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
                    return (
                      <MenuItem value={field.toLowerCase()}>{field}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
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
  skillsRequired: yup.array().required("required"),
  experience: yup.string().required("required"),
  educationLevel: yup.string().required("required"),
  educationField: yup.string().required("required"),
});
const initialValues = {
  jobTitle: "",
  jobDescription: "",
  skillsRequired: [],
  experience: "",
  educationLevel: "",
  educationField: "",
};

const jobApplicationFieldsValues = [
  "Accounting",
  "Administrative",
  "Customer Service",
  "Engineering",
  "Finance",
  "Human Resources",
  "Information Technology",
  "Marketing",
  "Operations",
  "Project Management",
  "Sales",
  "Software Development",
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
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate Degree",
];

export default Form;
