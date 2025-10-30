import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from './pages/property-details';
import ClientDashboard from './pages/client-dashboard';
import Login from './pages/login';
import EmployeeManagement from './pages/employee-management';
import PropertyManagement from './pages/property-management';
import ClientOnboarding from './pages/client-onboarding';
import OrderHistory from './pages/order-history';
import SalesWorkflow from './pages/sales-workflow';
import MaintenanceOrders from './pages/maintenance-orders';
import PurchaseWorkflow from './pages/purchase-workflow';
import EmployeeDashboard from "pages/employee-dashboard";
import NewRequestForm from "pages/new-request-form";


const Routes = () => {
  return (
    <BrowserRouter basename="/realtywealth">
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          {/* <Route path="/" element={<ClientDashboard />} /> */}
          <Route path="/" element={<ClientOnboarding />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/property-management" element={<PropertyManagement />} />
          <Route path="/client-onboarding" element={<ClientOnboarding />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/sales-workflow" element={<SalesWorkflow />} />
          <Route path="/maintenance-orders" element={<MaintenanceOrders />} />
          <Route path="/purchase-workflow" element={<PurchaseWorkflow />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/new-request-form" element={<NewRequestForm />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
