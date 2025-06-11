import React, { createContext, useContext } from 'react';
import { useNotification } from '../hooks/useNotification';
import NotificationContainer from '../components/NotificationContainer';

const NotificationContext = createContext(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll,
  } = useNotification();

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        success,
        error,
        warning,
        info,
        clearAll,
      }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
}; 