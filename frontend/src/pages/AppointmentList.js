import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await api.get('/appointments');
            setAppointments(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch appointments');
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Appointments</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Patient
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Doctor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(appointment.appointmentDateTime).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.patient?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.doctor?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${appointment.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' : 
                                        appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                                        'bg-yellow-100 text-yellow-800'}`}>
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        onClick={() => {/* Handle view */}}
                                    >
                                        View
                                    </button>
                                    {user.role === 'ADMIN' && (
                                        <>
                                            <button
                                                className="text-yellow-600 hover:text-yellow-900 mr-4"
                                                onClick={() => {/* Handle edit */}}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => {/* Handle delete */}}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentList; 