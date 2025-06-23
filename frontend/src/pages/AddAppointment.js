import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddAppointment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        dateTime: '',
        type: 'REGULAR',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchDoctorsAndPatients();
    }, []);

    const fetchDoctorsAndPatients = async () => {
        try {
            const [doctorsResponse, patientsResponse] = await Promise.all([
                api.get('/api/admin/doctors'),
                api.get('/api/admin/patients')
            ]);
            setDoctors(doctorsResponse.data);
            setPatients(patientsResponse.data);
        } catch (err) {
            setError('Failed to fetch doctors and patients. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear validation error when user types
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.patientId) errors.patientId = 'Please select a patient';
        if (!formData.doctorId) errors.doctorId = 'Please select a doctor';
        if (!formData.dateTime) errors.dateTime = 'Please select date and time';
        else {
            const selectedDate = new Date(formData.dateTime);
            const now = new Date();
            if (selectedDate < now) {
                errors.dateTime = 'Appointment date must be in the future';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError(null);
            await api.post('/api/admin/appointments', formData);
            navigate('/admin/appointments');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to schedule appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Appointment</h3>
                    
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Patient</label>
                                <select
                                    name="patientId"
                                    value={formData.patientId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.patientId ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select a patient</option>
                                    {patients.map(patient => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name} ({patient.email})
                                        </option>
                                    ))}
                                </select>
                                {validationErrors.patientId && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.patientId}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                                <select
                                    name="doctorId"
                                    value={formData.doctorId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.doctorId ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select a doctor</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>
                                            Dr. {doctor.name} ({doctor.specialization})
                                        </option>
                                    ))}
                                </select>
                                {validationErrors.doctorId && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.doctorId}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="dateTime"
                                    value={formData.dateTime}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.dateTime ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.dateTime && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.dateTime}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                >
                                    <option value="REGULAR">Regular Checkup</option>
                                    <option value="FOLLOW_UP">Follow-up</option>
                                    <option value="EMERGENCY">Emergency</option>
                                    <option value="CONSULTATION">Consultation</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                placeholder="Any additional notes or requirements..."
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/appointments')}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Scheduling...' : 'Schedule Appointment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAppointment; 