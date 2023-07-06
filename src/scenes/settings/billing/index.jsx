import { Box, Button, MenuItem, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import PackageCard from "./PackageCard";
import CreditCard from "./CreditCard";
import BillingHistoryTable from "./BillingHistoryTable";

const Billing = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="BILLING" subtitle="Your billing dashboard" />

      <Box m="20px">
        <Typography variant="h3">Current Package</Typography>
        <Box m="20px" display="flex" justifyContent="center">
          <PackageCard isActive={true} />
        </Box>
      </Box>

      <Box m="20px">
        <Typography variant="h3">Other Packages</Typography>
        <Box m="20px" display="flex" justifyContent="space-around">
          <PackageCard />
          <PackageCard />
        </Box>
      </Box>
      <Box m="20px">
        <Typography variant="h3">Saved Card</Typography>
        <Box m="20px" display="flex" justifyContent="space-around">
          <CreditCard />
          <CreditCard />
        </Box>
      </Box>
      <Box m="20px">
        <Typography variant="h3">Blling History</Typography>
        <Box m="20px">
          <BillingHistoryTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Billing;
