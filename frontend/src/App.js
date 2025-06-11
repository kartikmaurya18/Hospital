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
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} />;
  }

  return children;
};

const MainLayout = ({ children }) => {
  const { user } = useAuth();
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
                      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
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
                      <Route path="*" element={<Navigate to="/doctor/dashboard" />} />
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
                      <Route path="*" element={<Navigate to="/patient/dashboard" />} />
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
                    <Navigate to={`/${user.role.toLowerCase()}/dashboard`} />
                  )}
                </ProtectedRoute>
              }
            />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
