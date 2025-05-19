import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ClientDashboard from './pages/client/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import PasswordVault from './pages/admin/PasswordVault';
import InternalDocs from './pages/admin/InternalDocs';
import Tools from './pages/admin/Tools';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Client Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<div>My Projects</div>} />
            <Route path="tasks" element={<div>Tasks</div>} />
            <Route path="deliverables" element={<div>Deliverables</div>} />
            <Route path="documents" element={<div>Documents</div>} />
            <Route path="meetings" element={<div>Meetings</div>} />
            <Route path="messages" element={<div>Messages</div>} />
            <Route path="forms" element={<div>Forms & Requests</div>} />
            <Route path="account" element={<div>My Account</div>} />
            <Route path="notifications" element={<div>Notifications</div>} />
            <Route path="help" element={<div>Help & Support</div>} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clients" element={<div>Clients</div>} />
            <Route path="projects" element={<div>Projects</div>} />
            <Route path="calendar" element={<div>Calendar</div>} />
            <Route path="documents" element={<div>Documents</div>} />
            <Route path="reports" element={<div>Reports</div>} />
            <Route path="chat" element={<div>Team Chat</div>} />
            <Route path="all-clients" element={<div>All Clients</div>} />
            <Route path="all-projects" element={<div>All Projects</div>} />
            <Route path="all-tasks" element={<div>All Tasks</div>} />
            <Route path="shared-notes" element={<div>Shared Notes & Ideas</div>} />
            <Route path="internal-docs" element={<InternalDocs />} />
            <Route path="tools" element={<Tools />} />
            <Route path="sops" element={<div>SOPs / Training</div>} />
            <Route path="vault" element={<PasswordVault />} />
          </Route>
          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;