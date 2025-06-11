import React from 'react';

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

const colorClasses = {
  primary: 'text-blue-600',
  white: 'text-white',
  gray: 'text-gray-600',
};

export const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 