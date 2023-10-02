import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Network from "scenes/network";
import Customers from "scenes/customers";
import Shipments from "scenes/trades";
import Inbox from "scenes/inbox";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Performance from "scenes/performance";
import Profile from "scenes/profile";
import Login from "scenes/login";
import { LicenseInfo } from '@mui/x-license-pro';

import Session from 'react-session-api';
Session.set("username","20");

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = localStorage.getItem("token");
  LicenseInfo.setLicenseKey('134dfad56c517d6f235e75b3836771d7Tz03MTM0OSxFPTE3MjE3ODExMDEwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');
  
  if(!token) {
    return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/trades" element={<Shipments />} />
              <Route path="/network" element={<Network />} />
              <Route path="/profile/:userId?" element={<Profile />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
