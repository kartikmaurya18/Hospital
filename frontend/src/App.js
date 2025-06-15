import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientDashboard from './pages/patient/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please try refreshing the page</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
  }

  return children;
};

const MainLayout = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MainLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="staff" element={<div>Staff Management</div>} />
                        <Route path="inventory" element={<div>Inventory Management</div>} />
                        <Route path="billing" element={<div>Billing Management</div>} />
                        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor/*"
                element={
                  <ProtectedRoute allowedRoles={['DOCTOR']}>
                    <MainLayout>
                      <Routes>
                        <Route path="dashboard" element={<DoctorDashboard />} />
                        <Route path="patients" element={<div>Patient List</div>} />
                        <Route path="appointments" element={<div>Appointments</div>} />
                        <Route path="prescriptions" element={<div>Prescriptions</div>} />
                        <Route path="medical-records" element={<div>Medical Records</div>} />
                        <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Patient Routes */}
              <Route
                path="/patient/*"
                element={
                  <ProtectedRoute allowedRoles={['PATIENT']}>
                    <MainLayout>
                      <Routes>
                        <Route path="dashboard" element={<PatientDashboard />} />
                        <Route path="appointments" element={<div>My Appointments</div>} />
                        <Route path="prescriptions" element={<div>My Prescriptions</div>} />
                        <Route path="medical-records" element={<div>My Medical Records</div>} />
                        <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {({ user }) => (
                      <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />
                    )}
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
