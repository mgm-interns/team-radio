import { EMAIL_REGEX } from './constants';

export const required = value => (value ? undefined : 'This field is required');

export const email = value =>
  value && !EMAIL_REGEX.test(value)
    ? 'Please enter a valid email address'
    : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Use ${min} characters or more` : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Use ${max} characters or less` : undefined;

// custom size
export const minLength6 = minLength(6);
export const maxLength15 = maxLength(15);

export const customValidate = values => {
  const errors = {};

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password and confirm password does not match';
  }

  return errors;
};