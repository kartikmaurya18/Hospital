import { useState, useCallback } from 'react';

export const useLoading = (initialState = false, timeout = 30000) => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
    // Set a timeout to prevent infinite loading
    setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError('Operation timed out');
      }
    }, timeout);
  }, [timeout]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const setLoadingError = useCallback((error) => {
    setError(error);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
  };
}; 