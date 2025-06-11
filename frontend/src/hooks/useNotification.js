import { useState, useCallback } from 'react';

const DEFAULT_DURATION = 5000; // 5 seconds

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ type = 'info', message, duration = DEFAULT_DURATION }) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    return addNotification({ type: 'success', message, duration });
  }, [addNotification]);

  const error = useCallback((message, duration) => {
    return addNotification({ type: 'error', message, duration });
  }, [addNotification]);

  const warning = useCallback((message, duration) => {
    return addNotification({ type: 'warning', message, duration });
  }, [addNotification]);

  const info = useCallback((message, duration) => {
    return addNotification({ type: 'info', message, duration });
  }, [addNotification]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll,
  };
}; 