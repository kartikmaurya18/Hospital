import React from 'react';
import {
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Patients',
    value: '2,543',
    change: '+12.5%',
    icon: UserGroupIcon,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Total Doctors',
    value: '45',
    change: '+5.2%',
    icon: UserIcon,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Appointments',
    value: '156',
    change: '+8.1%',
    icon: CalendarIcon,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Revenue',
    value: '$12,345',
    change: '+15.3%',
    icon: CurrencyDollarIcon,
    color: 'from-yellow-500 to-yellow-600',
  },
];

const recentAppointments = [
  {
    id: 1,
    patient: 'John Doe',
    doctor: 'Dr. Sarah Smith',
    date: '2024-02-20',
    time: '10:00 AM',
    status: 'Scheduled',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    doctor: 'Dr. Michael Johnson',
    date: '2024-02-20',
    time: '11:30 AM',
    status: 'Completed',
  },
  {
    id: 3,
    patient: 'Robert Brown',
    doctor: 'Dr. Emily Davis',
    date: '2024-02-20',
    time: '2:00 PM',
    status: 'Scheduled',
  },
];

function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to your hospital management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className={`rounded-lg bg-gradient-to-r ${stat.color} p-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-green-600">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="glass-effect p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Appointments
          </h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patient}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {appointment.doctor}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {appointment.date}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {appointment.time}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          appointment.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 