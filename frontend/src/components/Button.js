import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500';
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      case 'outline':
        return 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500';
      case 'ghost':
        return 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'px-2 py-1 text-xs';
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      case 'xl':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const getDisabledClasses = () => {
    if (isDisabled || isLoading) {
      return 'opacity-50 cursor-not-allowed';
    }
    return 'cursor-pointer';
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();
  const disabledClasses = getDisabledClasses();

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner
          size="sm"
          color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'white'}
          className="mr-2"
        />
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button; 