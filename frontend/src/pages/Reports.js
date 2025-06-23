import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Reports = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('month');
    const [reportData, setReportData] = useState({
        revenue: [],
        appointments: [],
        departmentStats: [],
        patientStats: [],
        doctorStats: []
    });

    useEffect(() => {
        fetchReportData();
    }, [dateRange]);

    const fetchReportData = async () => {
        try {
            setLoading(true);
            const [revenueResponse, appointmentsResponse, departmentResponse, patientResponse, doctorResponse] = await Promise.all([
                api.get(`/api/admin/reports/revenue?dateRange=${dateRange}`),
                api.get(`/api/admin/reports/appointments?dateRange=${dateRange}`),
                api.get('/api/admin/reports/departments'),
                api.get('/api/admin/reports/patients'),
                api.get('/api/admin/reports/doctors')
            ]);

            setReportData({
                revenue: revenueResponse.data,
                appointments: appointmentsResponse.data,
                departmentStats: departmentResponse.data,
                patientStats: patientResponse.data,
                doctorStats: doctorResponse.data
            });
            setError(null);
        } catch (err) {
            setError('Failed to fetch report data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const revenueChartData = {
        labels: reportData.revenue.map(item => item.period),
        datasets: [
            {
                label: 'Revenue',
                data: reportData.revenue.map(item => item.amount),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }
        ]
    };

    const appointmentsChartData = {
        labels: reportData.appointments.map(item => item.date),
        datasets: [
            {
                label: 'Appointments',
                data: reportData.appointments.map(item => item.count),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }
        ]
    };

    const departmentChartData = {
        labels: reportData.departmentStats.map(item => item.name),
        datasets: [
            {
                data: reportData.departmentStats.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            }
        ]
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h2>
                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">Date Range:</label>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        ${reportData.revenue.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Total Appointments</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {reportData.appointments.reduce((sum, item) => sum + item.count, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
                    <p className="mt-2 text-3xl font-bold text-purple-600">
                        {reportData.patientStats.total}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Total Doctors</h3>
                    <p className="mt-2 text-3xl font-bold text-yellow-600">
                        {reportData.doctorStats.total}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
                    <div className="h-80">
                        <Line
                            data={revenueChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Revenue Over Time'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Appointments Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Appointments Overview</h3>
                    <div className="h-80">
                        <Bar
                            data={appointmentsChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Appointments by Date'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Department Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Department Distribution</h3>
                    <div className="h-80">
                        <Pie
                            data={departmentChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Patients by Department'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Patient Demographics */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Demographics</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700">Age Distribution</h4>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                {reportData.patientStats.ageGroups.map(group => (
                                    <div key={group.range} className="bg-gray-50 p-3 rounded">
                                        <p className="text-sm text-gray-600">{group.range}</p>
                                        <p className="text-lg font-semibold text-gray-900">{group.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-700">Gender Distribution</h4>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                {reportData.patientStats.genderDistribution.map(item => (
                                    <div key={item.gender} className="bg-gray-50 p-3 rounded">
                                        <p className="text-sm text-gray-600">{item.gender}</p>
                                        <p className="text-lg font-semibold text-gray-900">{item.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Statistics */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Top Performing Doctors</h4>
                            <div className="space-y-3">
                                {reportData.doctorStats.topDoctors.map(doctor => (
                                    <div key={doctor.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Dr. {doctor.name}</p>
                                            <p className="text-xs text-gray-500">{doctor.specialization}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{doctor.appointments} appointments</p>
                                            <p className="text-xs text-gray-500">${doctor.revenue.toLocaleString()} revenue</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Department Performance</h4>
                            <div className="space-y-3">
                                {reportData.departmentStats.map(dept => (
                                    <div key={dept.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                                            <p className="text-xs text-gray-500">{dept.doctors} doctors</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{dept.appointments} appointments</p>
                                            <p className="text-xs text-gray-500">${dept.revenue.toLocaleString()} revenue</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports; 