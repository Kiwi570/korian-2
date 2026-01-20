import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { AppShell } from './components/layout/AppShell'
import { ROLES } from './lib/constants'

// Pages
import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'

// Consultant Pages
import ConsultantDashboard from './pages/consultant/Dashboard'
import TimesheetPage from './pages/consultant/Timesheet'
import LeavePage from './pages/consultant/Leave'
import DocumentsPage from './pages/consultant/Documents'
import AchievementsPage from './pages/consultant/Achievements'
import ProfilePage from './pages/consultant/Profile'
import SettingsPage from './pages/consultant/Settings'

// Manager Pages
import ManagerDashboard from './pages/manager/Dashboard'
import ApprovalsPage from './pages/manager/Approvals'
import TeamPage from './pages/manager/Team'
import ReportsPage from './pages/manager/Reports'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function PublicRoute({ children }) {
  const { isAuthenticated, user } = useApp()
  
  if (isAuthenticated) {
    const redirectPath = user?.role === ROLES.MANAGER ? '/manager' : '/consultant'
    return <Navigate to={redirectPath} replace />
  }
  
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

      {/* Consultant Routes */}
      <Route path="/consultant" element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }>
        <Route index element={<ConsultantDashboard />} />
        <Route path="timesheet" element={<TimesheetPage />} />
        <Route path="leave" element={<LeavePage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Manager Routes */}
      <Route path="/manager" element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }>
        <Route index element={<ManagerDashboard />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
