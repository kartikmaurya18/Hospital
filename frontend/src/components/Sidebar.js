import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    return currentPath.startsWith(path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <div className="px-4 py-6">
        <nav className="space-y-2">
          {/* Admin Navigation */}
          <div className="space-y-2">
            <Link
              to="/admin/dashboard"
              className={`block px-4 py-2 rounded-md ${isActive('/admin/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/staff"
              className={`block px-4 py-2 rounded-md ${isActive('/admin/staff')}`}
            >
              Staff Management
            </Link>
            <Link
              to="/admin/inventory"
              className={`block px-4 py-2 rounded-md ${isActive('/admin/inventory')}`}
            >
              Inventory
            </Link>
            <Link
              to="/admin/billing"
              className={`block px-4 py-2 rounded-md ${isActive('/admin/billing')}`}
            >
              Billing
            </Link>
          </div>

          {/* Doctor Navigation */}
          <div className="space-y-2">
            <Link
              to="/doctor/dashboard"
              className={`block px-4 py-2 rounded-md ${isActive('/doctor/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/doctor/patients"
              className={`block px-4 py-2 rounded-md ${isActive('/doctor/patients')}`}
            >
              Patients
            </Link>
            <Link
              to="/doctor/appointments"
              className={`block px-4 py-2 rounded-md ${isActive('/doctor/appointments')}`}
            >
              Appointments
            </Link>
            <Link
              to="/doctor/prescriptions"
              className={`block px-4 py-2 rounded-md ${isActive('/doctor/prescriptions')}`}
            >
              Prescriptions
            </Link>
            <Link
              to="/doctor/medical-records"
              className={`block px-4 py-2 rounded-md ${isActive('/doctor/medical-records')}`}
            >
              Medical Records
            </Link>
          </div>

          {/* Patient Navigation */}
          <div className="space-y-2">
            <Link
              to="/patient/dashboard"
              className={`block px-4 py-2 rounded-md ${isActive('/patient/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/patient/appointments"
              className={`block px-4 py-2 rounded-md ${isActive('/patient/appointments')}`}
            >
              My Appointments
            </Link>
            <Link
              to="/patient/prescriptions"
              className={`block px-4 py-2 rounded-md ${isActive('/patient/prescriptions')}`}
            >
              My Prescriptions
            </Link>
            <Link
              to="/patient/medical-records"
              className={`block px-4 py-2 rounded-md ${isActive('/patient/medical-records')}`}
            >
              My Medical Records
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 