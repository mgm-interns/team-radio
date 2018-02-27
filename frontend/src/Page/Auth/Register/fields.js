import { maxLength15, required, username, minLength6 } from 'Util/validate';

const inputForm = {
  name: {
    icon: {},
    field: {
      label: 'Display name',
      name: 'name',
      validate: [required, maxLength15],
      props: {
        placeholder: 'Enter your display name',
      },
    },
  },
  username: {
    icon: {},
    field: {
      label: 'Username',
      name: 'username',
      validate: [username],
      props: {
        placeholder: 'Enter your username',
        autoCapitalize: 'off',
      },
    },
  },
  email: {
    icon: {},
    field: {
      label: 'Email',
      name: 'email',
      validate: [required],
      props: {
        placeholder: 'hello@example.com',
        type: 'email'
      },
    },
  },
  password: {
    icon: {},
    field: {
      label: 'Password',
      name: 'password',
      validate: [required, minLength6],
      props: {
        placeholder: 'Must be at least 6 characters',
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
        placeholder: 'Re-enter your password',
        type: 'password',
      },
    },
  },
};

export default inputForm;
