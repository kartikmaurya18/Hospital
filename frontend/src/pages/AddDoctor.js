import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddDoctor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        department: '',
        contact: '',
        address: '',
        qualification: '',
        experience: '',
        consultationFee: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

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
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
        if (!formData.password) errors.password = 'Password is required';
        else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (!formData.specialization.trim()) errors.specialization = 'Specialization is required';
        if (!formData.department.trim()) errors.department = 'Department is required';
        if (!formData.contact.trim()) errors.contact = 'Contact number is required';
        if (!formData.qualification.trim()) errors.qualification = 'Qualification is required';
        if (!formData.experience.trim()) errors.experience = 'Experience is required';
        if (!formData.consultationFee.trim()) errors.consultationFee = 'Consultation fee is required';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError(null);
            await api.post('/api/admin/doctors', formData);
            navigate('/admin/doctors');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add doctor. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Doctor</h3>
                    
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.name ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.name && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.email && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.password && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact</label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.contact ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.contact && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.contact}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.specialization ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.specialization && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.specialization}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.department ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.department && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.department}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.qualification ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.qualification && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.qualification}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.experience ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.experience && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.experience}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                                <input
                                    type="number"
                                    name="consultationFee"
                                    value={formData.consultationFee}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        validationErrors.consultationFee ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {validationErrors.consultationFee && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.consultationFee}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/doctors')}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Adding...' : 'Add Doctor'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor; 