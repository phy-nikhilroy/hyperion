import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import PageShell from './components/layout/PageShell'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Maintenance from './pages/Maintenance/Maintenance'
import Reports from './pages/Reports/Reports'
import SystemSettings from './pages/SystemSettings/SystemSettings'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"    element={<Dashboard />} />
          <Route path="maintenance"  element={<Maintenance />} />
          <Route path="reports"      element={<Reports />} />
          <Route path="settings"     element={<SystemSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
