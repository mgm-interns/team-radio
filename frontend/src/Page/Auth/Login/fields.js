import { required } from 'Util/validate';

const inputForm = {
  email: {
    icon: {},
    field: {
      label: 'Email or Username',
      name: 'email',
      validate: [required],
      props: {
        placeholder: 'Email or Username',
      },
    },
  },
  password: {
    icon: {},
    field: {
      label: 'Password',
      name: 'password',
      validate: [required],
      props: {
        placeholder: 'Password',
        type: 'password',
      },
    },
  },
};

export default inputForm;
