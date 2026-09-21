import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import BackOfficeLayout from "./layouts/BackOfficeLayout.jsx";
import Dashboard from "./pages/backoffice/Dashboard.jsx";
import StockDetail from "./pages/backoffice/StockDetail.jsx";
import Transfers from "./pages/backoffice/Transfers.jsx";
import Replenishment from "./pages/backoffice/Replenishment.jsx";
import Forecasting from "./pages/backoffice/Forecasting.jsx";
import Finance from "./pages/backoffice/Finance.jsx";
import PosLayout from "./layouts/PosLayout.jsx";
import Sale from "./pages/pos/Sale.jsx";
import ShiftClose from "./pages/pos/ShiftClose.jsx";
import { BranchProvider } from "./context/BranchContext.jsx";

export default function App() {
  return (
    <BranchProvider>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/backoffice" element={<BackOfficeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock/:sku" element={<StockDetail />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="replenishment" element={<Replenishment />} />
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="finance" element={<Finance />} />
        </Route>

        <Route path="/pos" element={<PosLayout />}>
          <Route index element={<Sale />} />
          <Route path="shift-close" element={<ShiftClose />} />
        </Route>
      </Routes>
    </BranchProvider>
  );
}
