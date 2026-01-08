import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Alerts from "./pages/Alerts";
import Drivers from "./pages/Drivers";
import Fleet from "./pages/Fleet";
import Fuel from "./pages/Fuel";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Trips from "./pages/Trips";
import Documents from "./pages/Documents";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      {/* Main Layout Wrapper */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} /> {/* Default Dashboard page */}
        <Route path="alerts" element={<Alerts />} />
        <Route path="documents-center" element={<Documents />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="fleet" element={<Fleet />} />
        <Route path="fuel" element={<Fuel />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="trips" element={<Trips />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
