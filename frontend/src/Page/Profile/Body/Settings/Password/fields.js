import { minLength6, required } from 'Util/validate';

const inputForm = {
  currentPassword: {
    icon: {},
    field: {
      label: 'Current password',
      name: 'currentPassword',
      validate: [required, minLength6],
      props: {
        placeholder: 'Current password',
        type: 'password',
      },
    },
  },
  newPassword: {
    icon: {},
    field: {
      label: 'New password',
      name: 'newPassword',
      validate: [required, minLength6],
      props: {
        placeholder: 'New password',
        type: 'password',
      },
    },
  },
  confirmPassword: {
    icon: {},
    field: {
      label: 'Confirm password',
      name: 'confirmPassword',
      validate: [required],
      props: {
        placeholder: 'Re-enter your new password',
        type: 'password',
      },
    },
  },
};

export default inputForm;
