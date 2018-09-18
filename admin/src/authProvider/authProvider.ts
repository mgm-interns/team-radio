const { AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT, AUTH_GET_PERMISSIONS } = require('react-admin');

export const authProvider = (type: string, params: any): Promise<any> => {
  switch (type) {
    case AUTH_LOGIN:
      // called when the user attempts to log in
      return login(params);
    case AUTH_LOGOUT:
      // called when the user clicks on the logout button
      return logout();
    case AUTH_ERROR:
      // called when the API returns an error
      return checkAuthenticationError(params);
    case AUTH_CHECK:
      // called when the user navigates to a new location
      return checkAuthentication();
    case AUTH_GET_PERMISSIONS:
      // called when the user performs any actions
      return getUserPermission();
    default:
      return Promise.reject('Unknown type');
  }
};

async function login(params: any) {
  try {
    const { username, password } = params;
    const { data, errors } = await request({
      query: `
        mutation login($email: String, $username: String, $password: String!) {
          login(credential: { email: $email, username: $username, password: $password }) {
            authToken {
              token
              refreshToken
            }
            roles {
              role
              stationId
            }
          }
        }
      `,
      variables: { username, password }
    });
    if (errors) {
      const error = errors[0];
      if (error.statusCode === 400) return Promise.resolve();
      return Promise.reject(error);
    }
    const {
      authToken: { token, refreshToken },
      roles
    } = data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('roles', JSON.stringify(roles));
    return Promise.resolve();
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('roles');
  return Promise.resolve();
}

async function checkAuthenticationError(params: any) {
  const { status } = params;
  if (status === 401 || status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
    return Promise.reject();
  }
  return Promise.resolve();
}

async function checkAuthentication() {
  try {
    const { data, errors } = await request({ query: '{ currentUser { id, roles { role, stationId } } }' });
    if (errors) {
      const error = errors[0];
      return Promise.reject(error);
    }
    localStorage.setItem('roles', JSON.stringify(data.currentUser.roles));
    return Promise.resolve();
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

async function getUserPermission() {
  const rawRoles = localStorage.getItem('roles');
  const roles = JSON.parse(rawRoles);
  return Promise.resolve(roles);
}

export function request(body: object) {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (token) {
    headers.Authorization = token;
  }
  if (refreshToken) {
    headers.refreshToken = refreshToken;
  }
  return fetch(process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api', {
    headers,
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(console.error);
}
