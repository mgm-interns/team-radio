import sleep from 'Util/sleep';

export const loadAuthenticationState = () => {
  sleep();
  try {
    const serializedState = localStorage.getItem('token');

    if (serializedState === null) {
      return undefined;
    }

    return serializedState;
  } catch (error) {
    return undefined;
  }
};

export const saveAuthenticationState = state => {
  sleep();
  try {
    // const serializedState = JSON.stringify(state);
    localStorage.setItem('token', state.token);
    localStorage.setItem('userId', state.userId);
  } catch (error) {
    // ignore them error
  }
};

export const removeAuthenticationState = () => {
  sleep();
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  } catch (error) {
    // ignore them error
  }
};
