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
import SOPs from './pages/admin/SOPs';
import MyClients from './pages/admin/Clients';
import AllClients from './pages/admin/AllClients';
import TeamChat from './pages/admin/TeamChat';
import Reports from './pages/admin/Reports';
import SharedNotes from './pages/admin/SharedNotes';
import Calendar from './pages/admin/Calendar';
import MyCalendar from './pages/admin/MyCalendar';
import AllProjects from './pages/admin/AllProjects';
import MyProjects from './pages/admin/Projects';
import MyTasks from './pages/admin/MyTasks';
import AllTasks from './pages/admin/AllTasks';
import BrandAssets from './pages/admin/BrandAssets';
import Legal from './pages/admin/Legal';
import Settings from './pages/admin/Settings';
import MyAccount from './pages/admin/MyAccount';
import ClientMyProjects from './pages/client/MyProjects';

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
            <Route path="projects" element={<ClientMyProjects />} />
            <Route path="tasks" element={<div>Tasks</div>} />
            <Route path="deliverables" element={<div>Deliverables</div>} />
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
            <Route path="clients" element={<MyClients />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="my-calendar" element={<MyCalendar />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="reports" element={<Reports />} />
            <Route path="chat" element={<TeamChat />} />
            <Route path="all-clients" element={<AllClients />} />
            <Route path="all-projects" element={<AllProjects />} />
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="shared-notes" element={<SharedNotes />} />
            <Route path="internal-docs" element={<InternalDocs />} />
            <Route path="tools" element={<Tools />} />
            <Route path="sops" element={<SOPs />} />
            <Route path="vault" element={<PasswordVault />} />
            <Route path="brand-assets" element={<BrandAssets />} />
            <Route path="legal" element={<Legal />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<MyAccount />} />
          </Route>
          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;