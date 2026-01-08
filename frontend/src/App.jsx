import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Drivers from "./pages/Drivers";
import Fleet from "./pages/Fleet";
import Fuel from "./pages/Fuel";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import VehicleDetails from "./pages/VehicleDetails";
import DocumentsCenter from "./pages/DocumentsCenter";
import Vehicles from "./pages/Vehicles";
import PageNotFound from "./pages/PageNotFound";
import Maintenance from "./pages/Maintenance";

const App = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Main App Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="documents-center" element={<DocumentsCenter />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="fleet" element={<Fleet />} />
        <Route path="fuel" element={<Fuel />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="trips" element={<Trips />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />



        {/* fleet route */}
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/maintaince" element={<Maintenance />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
