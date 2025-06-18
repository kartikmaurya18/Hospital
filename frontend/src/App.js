import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import DoctorList from './pages/DoctorList';
import AppointmentList from './pages/AppointmentList';
import MedicalRecordList from './pages/MedicalRecordList';
import PrescriptionList from './pages/PrescriptionList';
import BillingList from './pages/BillingList';
import NotificationList from './pages/NotificationList';
import { useAuth } from './contexts/AuthContext';

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

const MainLayout = ({ children }) => {
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

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" />;
    }

    return <Layout>{children}</Layout>;
};

const App = () => {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin/patients" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <PatientList />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/doctors" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <DoctorList />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/appointments" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <AppointmentList />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/medical-records" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <MedicalRecordList />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/prescriptions" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <PrescriptionList />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/billing" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <BillingList />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/notifications" element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <NotificationList />
                            </ProtectedRoute>
                        } />

                        {/* Doctor Routes */}
                        <Route path="/doctor/appointments" element={
                            <ProtectedRoute allowedRoles={['DOCTOR']}>
                                <AppointmentList />
                            </ProtectedRoute>
                        } />
                        <Route path="/doctor/medical-records" element={
                            <ProtectedRoute allowedRoles={['DOCTOR']}>
                                <MedicalRecordList />
                            </ProtectedRoute>
                        } />
                        <Route path="/doctor/prescriptions" element={
                            <ProtectedRoute allowedRoles={['DOCTOR']}>
                                <PrescriptionList />
                            </ProtectedRoute>
                        } />
                        <Route path="/doctor/notifications" element={
                            <ProtectedRoute allowedRoles={['DOCTOR']}>
                                <NotificationList />
                            </ProtectedRoute>
                        } />

                        {/* Patient Routes */}
                        <Route path="/patient/appointments" element={
                            <ProtectedRoute allowedRoles={['PATIENT']}>
                                <AppointmentList />
                            </ProtectedRoute>
                        } />
                        <Route path="/patient/medical-records" element={
                            <ProtectedRoute allowedRoles={['PATIENT']}>
                                <MedicalRecordList />
                            </ProtectedRoute>
                        } />
                        <Route path="/patient/prescriptions" element={
                            <ProtectedRoute allowedRoles={['PATIENT']}>
                                <PrescriptionList />
                            </ProtectedRoute>
                        } />
                        <Route path="/patient/billing" element={
                            <ProtectedRoute allowedRoles={['PATIENT']}>
                                <BillingList />
                            </ProtectedRoute>
                        } />
                        <Route path="/patient/notifications" element={
                            <ProtectedRoute allowedRoles={['PATIENT']}>
                                <NotificationList />
                            </ProtectedRoute>
                        } />

                        {/* Common Routes */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                        {/* Default Route */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ErrorBoundary>
    );
};

export default App;
