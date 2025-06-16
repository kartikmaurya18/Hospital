import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Staff Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Staff</h3>
          <p className="text-3xl font-bold text-blue-600">25</p>
        </div>

        {/* Patient Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
          <p className="text-3xl font-bold text-green-600">150</p>
        </div>

        {/* Doctor Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Doctors</h3>
          <p className="text-3xl font-bold text-purple-600">15</p>
        </div>

        {/* Appointment Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Today's Appointments</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <span className="text-sm font-medium leading-none text-blue-600">JD</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New doctor joined</p>
                  <p className="text-sm text-gray-500">Dr. John Doe joined the hospital</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                    <span className="text-sm font-medium leading-none text-green-600">AP</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New appointment scheduled</p>
                  <p className="text-sm text-gray-500">Patient Alice Parker scheduled an appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 