import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardWallet } from "./pages/DashboardWallet";
import DashboardLayout from "./layouts/DashbaordLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/wallet" />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="wallet" element={<DashboardWallet />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
