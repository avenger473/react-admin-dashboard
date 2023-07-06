import {
  Box,
  Button,
  useTheme,
  Typography,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { tokens } from "../../../theme";

export default function CreditCard({ isActive = false }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="360px" sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ bgcolor: colors.primary[400] }}>
        <CardContent>
          <Box mt={"20px"} mb={"20px"}>
            <Typography variant="h4">5234 XXXX XXXX 4545</Typography>
          </Box>
          <Box display={"flex"} mt={"60px"}>
            <Box>
              <Typography variant="h5">Card Holder</Typography>
              <Typography variant="h4">Akhil Tiwari</Typography>
            </Box>
            <Box ml="60px">
              <Typography variant="h5">Expiry</Typography>
              <Typography variant="h4">05/26</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box display={"flex"} justifyContent="flex-end">
        <FormControlLabel
          value="deactivate"
          control={<Switch color="secondary" />}
          label="Deactivate Card"
          labelPlacement="start"
        />
      </Box>
    </Box>
  );
}
