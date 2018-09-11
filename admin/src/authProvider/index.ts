const { AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT } = require('react-admin');

export const authProvider = (type: string, params: any): Promise<any> => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    return login(params);
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    return logout();
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    return checkAuthenticationError(params);
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return checkAuthentication();
  }
  return Promise.reject('Unknown method');
};

async function login(params: any) {
  try {
    const { username, password } = params;
    const { data, errors } = await request({
      query: `
        mutation login($email: String, $username: String, $password: String!) {
          login(credential: { email: $email, username: $username, password: $password }) {
            token
            refreshToken
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
    const { token, refreshToken } = data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return Promise.resolve();
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  return Promise.resolve();
}

async function checkAuthenticationError(params: any) {
  const { status } = params;
  if (status === 401 || status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return Promise.reject();
  }
  return Promise.resolve();
}

async function checkAuthentication() {
  try {
    const { errors } = await request({ query: '{ currentUser { id } }' });
    if (errors) {
      const error = errors[0];
      return Promise.reject(error);
    }
    return Promise.resolve();
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
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
