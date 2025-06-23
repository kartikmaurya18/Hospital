import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [settings, setSettings] = useState({
        system: {
            hospitalName: '',
            address: '',
            contact: '',
            email: '',
            workingHours: '',
            timezone: ''
        },
        notifications: {
            emailNotifications: true,
            appointmentReminders: true,
            lowStockAlerts: true,
            newPatientAlerts: true,
            dailyReports: false
        },
        appointments: {
            slotDuration: 30,
            maxAppointmentsPerDay: 20,
            allowOnlineBooking: true,
            requireConfirmation: true,
            cancellationPolicy: '24h'
        },
        billing: {
            currency: 'USD',
            taxRate: 0,
            allowOnlinePayment: true,
            paymentMethods: ['cash', 'card'],
            invoicePrefix: 'INV-'
        }
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/admin/settings');
            setSettings(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (section) => {
        try {
            setLoading(true);
            await api.put(`/api/admin/settings/${section}`, settings[section]);
            setSuccess(`${section} settings updated successfully.`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(`Failed to update ${section} settings. Please try again.`);
        } finally {
            setLoading(false);
        }
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
            <h2 className="text-2xl font-semibold text-gray-900">System Settings</h2>

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

            {/* System Information */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                            <input
                                type="text"
                                value={settings.system.hospitalName}
                                onChange={(e) => handleChange('system', 'hospitalName', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={settings.system.email}
                                onChange={(e) => handleChange('system', 'email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="tel"
                                value={settings.system.contact}
                                onChange={(e) => handleChange('system', 'contact', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Working Hours</label>
                            <input
                                type="text"
                                value={settings.system.workingHours}
                                onChange={(e) => handleChange('system', 'workingHours', e.target.value)}
                                placeholder="e.g., 9:00 AM - 5:00 PM"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                value={settings.system.address}
                                onChange={(e) => handleChange('system', 'address', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => handleSubmit('system')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        {getNotificationDescription(key)}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('notifications', key, !value)}
                                        className={`${
                                            value ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                    >
                                        <span
                                            className={`${
                                                value ? 'translate-x-5' : 'translate-x-0'
                                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => handleSubmit('notifications')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Appointment Settings */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slot Duration (minutes)</label>
                            <input
                                type="number"
                                value={settings.appointments.slotDuration}
                                onChange={(e) => handleChange('appointments', 'slotDuration', parseInt(e.target.value))}
                                min="15"
                                step="15"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Appointments Per Day</label>
                            <input
                                type="number"
                                value={settings.appointments.maxAppointmentsPerDay}
                                onChange={(e) => handleChange('appointments', 'maxAppointmentsPerDay', parseInt(e.target.value))}
                                min="1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
                            <select
                                value={settings.appointments.cancellationPolicy}
                                onChange={(e) => handleChange('appointments', 'cancellationPolicy', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="12h">12 hours before</option>
                                <option value="24h">24 hours before</option>
                                <option value="48h">48 hours before</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={settings.appointments.allowOnlineBooking}
                                onChange={(e) => handleChange('appointments', 'allowOnlineBooking', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Allow Online Booking
                            </label>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => handleSubmit('appointments')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Billing Settings */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Currency</label>
                            <select
                                value={settings.billing.currency}
                                onChange={(e) => handleChange('billing', 'currency', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="INR">INR (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                            <input
                                type="number"
                                value={settings.billing.taxRate}
                                onChange={(e) => handleChange('billing', 'taxRate', parseFloat(e.target.value))}
                                min="0"
                                max="100"
                                step="0.1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Invoice Prefix</label>
                            <input
                                type="text"
                                value={settings.billing.invoicePrefix}
                                onChange={(e) => handleChange('billing', 'invoicePrefix', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={settings.billing.allowOnlinePayment}
                                onChange={(e) => handleChange('billing', 'allowOnlinePayment', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Allow Online Payment
                            </label>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => handleSubmit('billing')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getNotificationDescription = (key) => {
    const descriptions = {
        emailNotifications: 'Receive notifications via email',
        appointmentReminders: 'Send reminders for upcoming appointments',
        lowStockAlerts: 'Get notified when inventory items are running low',
        newPatientAlerts: 'Receive notifications for new patient registrations',
        dailyReports: 'Get daily summary reports of hospital activities'
    };
    return descriptions[key] || '';
};

export default Settings; 