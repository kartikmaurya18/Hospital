import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalDoctors: 0,
        totalPatients: 0,
        totalAppointments: 0,
        totalMedicalRecords: 0,
        totalRevenue: 0,
        pendingAppointments: 0,
        todayAppointments: 0,
        lowStockItems: 0,
        recentAppointments: [],
        recentPatients: [],
        departmentStats: [],
        revenueStats: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        dateRange: 'week',
        department: 'all'
    });

    useEffect(() => {
        fetchDashboardData();
    }, [filter]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsResponse, appointmentsResponse, patientsResponse, departmentResponse, revenueResponse] = await Promise.all([
                api.get('/api/admin/stats'),
                api.get(`/api/admin/recent-appointments?dateRange=${filter.dateRange}`),
                api.get('/api/admin/recent-patients'),
                api.get('/api/admin/department-stats'),
                api.get(`/api/admin/revenue-stats?dateRange=${filter.dateRange}`)
            ]);

            setStats({
                ...statsResponse.data,
                recentAppointments: appointmentsResponse.data,
                recentPatients: patientsResponse.data,
                departmentStats: departmentResponse.data,
                revenueStats: revenueResponse.data
            });
            setError(null);
        } catch (err) {
            setError('Failed to fetch dashboard data. Please try again later.');
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (type, value) => {
        setFilter(prev => ({
            ...prev,
            [type]: value
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filter Controls */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date Range</label>
                        <select
                            value={filter.dateRange}
                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            value={filter.department}
                            onChange={(e) => handleFilterChange('department', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">All Departments</option>
                            {stats.departmentStats.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Total Doctors</h2>
                            <p className="text-2xl font-semibold text-gray-800">{stats.totalDoctors}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Total Patients</h2>
                            <p className="text-2xl font-semibold text-gray-800">{stats.totalPatients}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Today's Appointments</h2>
                            <p className="text-2xl font-semibold text-gray-800">{stats.todayAppointments}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Total Revenue</h2>
                            <p className="text-2xl font-semibold text-gray-800">${stats.totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Department Statistics</h3>
                    <div className="space-y-4">
                        {stats.departmentStats.map(dept => (
                            <div key={dept.id} className="flex justify-between items-center">
                                <span className="text-gray-600">{dept.name}</span>
                                <span className="text-gray-900 font-medium">{dept.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
                    <div className="space-y-4">
                        {stats.revenueStats.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-gray-600">{item.period}</span>
                                <span className="text-gray-900 font-medium">${item.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Pending Appointments</span>
                            <span className="text-yellow-600 font-medium">{stats.pendingAppointments}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Low Stock Items</span>
                            <span className="text-red-600 font-medium">{stats.lowStockItems}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                        <Link
                            to="/admin/doctors/add"
                            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span className="text-blue-600 font-medium">Add New Doctor</span>
                        </Link>

                        <Link
                            to="/admin/patients/add"
                            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span className="text-green-600 font-medium">Add New Patient</span>
                        </Link>

                        <Link
                            to="/admin/appointments/add"
                            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                            <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-purple-600 font-medium">Schedule Appointment</span>
                        </Link>

                        <Link
                            to="/admin/inventory"
                            className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                        >
                            <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-yellow-600 font-medium">Manage Inventory</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Appointments */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Recent Appointments</h3>
                        <Link to="/admin/appointments" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {stats.recentAppointments.map((appointment) => (
                                <li key={appointment.id} className="px-4 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {appointment.patientName} with Dr. {appointment.doctorName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(appointment.dateTime).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            appointment.status === 'SCHEDULED'
                                                ? 'bg-green-100 text-green-800'
                                                : appointment.status === 'COMPLETED'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recent Patients */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Recent Patients</h3>
                        <Link to="/admin/patients" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {stats.recentPatients.map((patient) => (
                                <li key={patient.id} className="px-4 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 font-medium">
                                                        {patient.name.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                                                <p className="text-sm text-gray-500">{patient.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(patient.registrationDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 