import { maxLength15, required, username } from 'Util/validate';

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
      validate: [required, username],
      props: {
        placeholder: 'Username',
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
      },
      disabled: true,
    },
  },
  firstname: {
    icon: {},
    field: {
      label: 'First name',
      name: 'firstname',
      validate: [],
      props: {
        placeholder: 'First name',
      },
    },
  },
  lastname: {
    icon: {},
    field: {
      label: 'Last name',
      name: 'lastname',
      validate: [],
      props: {
        placeholder: 'Last name',
      },
    },
  },
  bio: {
    icon: {},
    field: {
      label: 'Bio',
      name: 'bio',
      validate: [],
      props: {
        placeholder:
          'Tell the world a little bit about yourself. The shorter the better',
      },
    },
  },
  city: {
    icon: {},
    field: {
      label: 'City',
      name: 'city',
      validate: [],
      props: {
        placeholder: 'City',
      },
    },
  },
  country: {
    icon: {},
    field: {
      label: 'Country',
      name: 'country',
      validate: [],
      props: {
        placeholder: 'Country',
      },
    },
  },
};

export default inputForm;
