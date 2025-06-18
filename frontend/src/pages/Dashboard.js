import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    const renderDashboardContent = () => {
        switch (user.role) {
            case 'ADMIN':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
                            <p className="text-3xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Total Doctors</h3>
                            <p className="text-3xl font-bold text-green-600">0</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
                            <p className="text-3xl font-bold text-purple-600">0</p>
                        </div>
                    </div>
                );
            case 'DOCTOR':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Today's Appointments</h3>
                            <p className="text-3xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Pending Prescriptions</h3>
                            <p className="text-3xl font-bold text-yellow-600">0</p>
                        </div>
                    </div>
                );
            case 'PATIENT':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
                            <p className="text-3xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Recent Prescriptions</h3>
                            <p className="text-3xl font-bold text-green-600">0</p>
                        </div>
                    </div>
                );
            default:
                return <div>Invalid role</div>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome, {user.name}
                </h1>
            </div>
            {renderDashboardContent()}
        </div>
    );
};

export default Dashboard; 