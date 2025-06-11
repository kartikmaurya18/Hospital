import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  CubeIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getAdminNavigation = () => [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Staff', href: '/admin/staff', icon: UsersIcon },
    { name: 'Inventory', href: '/admin/inventory', icon: CubeIcon },
    { name: 'Billing', href: '/admin/billing', icon: CurrencyDollarIcon },
  ];

  const getDoctorNavigation = () => [
    { name: 'Dashboard', href: '/doctor/dashboard', icon: HomeIcon },
    { name: 'Patients', href: '/doctor/patients', icon: UserGroupIcon },
    { name: 'Appointments', href: '/doctor/appointments', icon: CalendarIcon },
    { name: 'Prescriptions', href: '/doctor/prescriptions', icon: ClipboardDocumentListIcon },
    { name: 'Medical Records', href: '/doctor/medical-records', icon: ClipboardDocumentListIcon },
  ];

  const getPatientNavigation = () => [
    { name: 'Dashboard', href: '/patient/dashboard', icon: HomeIcon },
    { name: 'Appointments', href: '/patient/appointments', icon: CalendarIcon },
    { name: 'Prescriptions', href: '/patient/prescriptions', icon: ClipboardDocumentListIcon },
    { name: 'Medical Records', href: '/patient/medical-records', icon: ClipboardDocumentListIcon },
  ];

  const getNavigation = () => {
    switch (user?.role) {
      case 'ADMIN':
        return getAdminNavigation();
      case 'DOCTOR':
        return getDoctorNavigation();
      case 'PATIENT':
        return getPatientNavigation();
      default:
        return [];
    }
  };

  const navigation = getNavigation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Hospital Management"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user?.avatar || 'https://via.placeholder.com/40'}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 