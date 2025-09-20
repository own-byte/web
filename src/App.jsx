import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Register from "./pages/auth/register"
import Login from "./pages/auth/login"
import DashboardLayout from "./pages/global/dashboardLayout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import GroupCreate from "./pages/groups/GroupCreate"
import SecretCreate from "./pages/secrets/SecretCreate"
import AllSecrets from "./pages/secrets/AllSecrets"

const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
}

function App() {
  return (
    <div className="bg-black min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AllSecrets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/group/create"
              element={
                <ProtectedRoute>
                  <GroupCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secret/create"
              element={
                <ProtectedRoute>
                  <SecretCreate />
                </ProtectedRoute>
              }
            />
            {/* Root route */}
            <Route path="/" element={<RootRedirect />} />
            {/* 404 route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App