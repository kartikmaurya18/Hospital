import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CubeIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Patients', to: '/patients', icon: UserGroupIcon },
  { name: 'Doctors', to: '/doctors', icon: UserIcon },
  { name: 'Appointments', to: '/appointments', icon: CalendarIcon },
  { name: 'Medical Records', to: '/medical-records', icon: ClipboardDocumentIcon },
  { name: 'Prescriptions', to: '/prescriptions', icon: DocumentTextIcon },
  { name: 'Billing', to: '/billing', icon: CurrencyDollarIcon },
  { name: 'Inventory', to: '/inventory', icon: CubeIcon },
  { name: 'Staff', to: '/staff', icon: UserCircleIcon },
  { name: 'Chat', to: '/chat', icon: ChatBubbleLeftRightIcon },
];

const bottomNavigation = [
  { name: 'Profile', to: '/profile', icon: UserCircleIcon },
  { name: 'Settings', to: '/settings', icon: Cog6ToothIcon },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-16 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <nav className="space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar; 