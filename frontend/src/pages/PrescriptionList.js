import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            setLoading(true);
            const response = await api.get('/prescriptions');
            setPrescriptions(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch prescriptions');
            console.error('Error fetching prescriptions:', err);
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
            <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Patient
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Doctor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Medications
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {prescriptions.map((prescription) => (
                            <tr key={prescription.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prescription.patient?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prescription.doctor?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(prescription.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 truncate max-w-xs">
                                        {prescription.medications?.join(', ') || 'N/A'}
                                    </div>
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

export default PrescriptionList; 