import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TablePlats from "../components/dashboard/TablePlats";
import MainDashboard from "../pages/dashboard";
import PlatDetail from "../pages/dashboard/PlatDetail";
const ConfigRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainDashboard />}>
          <Route path="/" element={<TablePlats />} />
          <Route path="/plat/:id" element={<PlatDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ConfigRoute;
