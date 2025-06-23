import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await api.get('/notifications');
            setNotifications(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch notifications');
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await api.put(`/notifications/${notificationId}/read`);
            setNotifications(notifications.map(notification =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            ));
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await api.delete(`/notifications/${notificationId}`);
            setNotifications(notifications.filter(notification => notification.id !== notificationId));
        } catch (err) {
            console.error('Error deleting notification:', err);
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
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>
            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No notifications found
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white shadow rounded-lg p-4 ${
                                !notification.read ? 'border-l-4 border-blue-500' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {notification.title}
                                    </h3>
                                    <p className="mt-1 text-gray-600">
                                        {notification.message}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationList; 