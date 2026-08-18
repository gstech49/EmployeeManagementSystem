import React from 'react'
import {Toaster} from "react-hot-toast";
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginLanding from "./pages/LoginLanding.jsx";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Attendance from "./pages/Attendance.jsx";
import Leave from "./pages/Leave.jsx";
import Payslip from "./pages/Payslip.jsx";
import Settings from "./pages/Settings.jsx";
import PrintPayslip from "./pages/PrintPayslip.jsx";
import LoginForm from './components/LoginForm.jsx';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>  
          <Route path="/login" element={<LoginLanding />} />
          <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Login to access the admin panel" />} />
          <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="Login to access your employee dashboard" />} />
        <Route element={<Layout />}> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslip" element={<Payslip />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
          <Route path="/print/payslip/:id" element={<PrintPayslip />} />
          <Route path="*" element={<Navigate to="/dashboard" replace /> } />
      </Routes>
    </>
  )
}

export default App