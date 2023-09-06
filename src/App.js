import { Routes, Route } from "react-router-dom";

import Dashboard from "./scenes/dashboard";
import Candidates from "./scenes/candidates";
import Invoices from "./scenes/invoices";
import Reporting from "./scenes/reporting";
import Jobs from "./scenes/jobs";
import Bar from "./scenes/bar";
import CreateJobForm from "./scenes/createJobForm";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/settings/faq";
import Billing from "./scenes/settings/billing";
import General from "./scenes/settings/general";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Signin from "./scenes/signin";
import { HomeLayout } from "./components/HomeLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/login" element={<Signin />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="candidates" element={<Candidates />} />
              <Route path="reporting" element={<Reporting />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="create_job" element={<CreateJobForm />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="billing" element={<Billing />} />
              <Route path="general" element={<General />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="geography" element={<Geography />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
