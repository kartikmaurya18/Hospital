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
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
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
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="patients" element={<PatientList />} />
                  <Route path="doctors" element={<DoctorList />} />
                  <Route path="appointments" element={<AppointmentList />} />
                  <Route path="medical-records" element={<MedicalRecordList />} />
                  <Route path="prescriptions" element={<PrescriptionList />} />
                  <Route path="billing" element={<BillingList />} />
                  <Route path="notifications" element={<NotificationList />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Doctor Routes */}
            <Route path="/doctor/*" element={
              <ProtectedRoute allowedRoles={['DOCTOR']}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="appointments" element={<AppointmentList />} />
                  <Route path="medical-records" element={<MedicalRecordList />} />
                  <Route path="prescriptions" element={<PrescriptionList />} />
                  <Route path="notifications" element={<NotificationList />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Patient Routes */}
            <Route path="/patient/*" element={
              <ProtectedRoute allowedRoles={['PATIENT']}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="appointments" element={<AppointmentList />} />
                  <Route path="medical-records" element={<MedicalRecordList />} />
                  <Route path="prescriptions" element={<PrescriptionList />} />
                  <Route path="billing" element={<BillingList />} />
                  <Route path="notifications" element={<NotificationList />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
