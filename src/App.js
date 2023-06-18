import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/create_job" element={<CreateJobForm />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/general" element={<General />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
