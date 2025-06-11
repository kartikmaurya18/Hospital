import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const value = values[field];
      const rules = validationRules[field];

      if (rules.required && !value) {
        newErrors[field] = 'This field is required';
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || 'Invalid format';
      } else if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `Minimum length is ${rules.minLength}`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[field] = `Maximum length is ${rules.maxLength}`;
      } else if (rules.custom) {
        const customError = rules.custom(value, values);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault();
      if (validate()) {
        await onSubmit(values);
      }
    },
    [validate, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    validate,
  };
}; 