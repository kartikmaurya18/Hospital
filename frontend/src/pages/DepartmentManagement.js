import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        head: '',
        capacity: '',
        specializations: []
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/admin/departments');
            setDepartments(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch departments. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (selectedDepartment) {
                await api.put(`/api/admin/departments/${selectedDepartment.id}`, formData);
                setSuccess('Department updated successfully.');
            } else {
                await api.post('/api/admin/departments', formData);
                setSuccess('Department added successfully.');
            }
            fetchDepartments();
            setShowModal(false);
            setFormData({
                name: '',
                description: '',
                head: '',
                capacity: '',
                specializations: []
            });
            setSelectedDepartment(null);
        } catch (err) {
            setError('Failed to save department. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (departmentId) => {
        if (!window.confirm('Are you sure you want to delete this department?')) {
            return;
        }

        try {
            setLoading(true);
            await api.delete(`/api/admin/departments/${departmentId}`);
            setSuccess('Department deleted successfully.');
            fetchDepartments();
        } catch (err) {
            setError('Failed to delete department. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department);
        setFormData({
            name: department.name,
            description: department.description,
            head: department.head,
            capacity: department.capacity,
            specializations: department.specializations
        });
        setShowModal(true);
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
                <h2 className="text-2xl font-semibold text-gray-900">Department Management</h2>
                <button
                    onClick={() => {
                        setSelectedDepartment(null);
                        setFormData({
                            name: '',
                            description: '',
                            head: '',
                            capacity: '',
                            specializations: []
                        });
                        setShowModal(true);
                    }}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add New Department
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((department) => (
                    <div key={department.id} className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {department.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {department.description}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(department)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(department.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="font-medium">Head:</span>
                                    <span className="ml-2">{department.head}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="font-medium">Capacity:</span>
                                    <span className="ml-2">{department.capacity}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm font-medium text-gray-500">Specializations:</span>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {department.specializations.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Department Modal */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                        {selectedDepartment ? 'Edit Department' : 'Add New Department'}
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Department Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Department Head
                                            </label>
                                            <input
                                                type="text"
                                                name="head"
                                                value={formData.head}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Capacity
                                            </label>
                                            <input
                                                type="number"
                                                name="capacity"
                                                value={formData.capacity}
                                                onChange={handleChange}
                                                required
                                                min="1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Specializations
                                            </label>
                                            <input
                                                type="text"
                                                name="specializations"
                                                value={formData.specializations.join(', ')}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    specializations: e.target.value.split(',').map(s => s.trim())
                                                }))}
                                                placeholder="Enter specializations separated by commas"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {selectedDepartment ? 'Update' : 'Add'} Department
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentManagement; 