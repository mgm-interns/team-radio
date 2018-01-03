import sleep from 'Util/sleep';

export const loadAuthenticationState = () => {
  sleep();
  try {
    const serializedState = localStorage.getItem('authentication');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveAuthenticationState = state => {
  sleep();
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authentication', serializedState);
  } catch (error) {
    // ignore them error
  }
};

export const removeAuthenticationState = () => {
  sleep();
  try {
    localStorage.removeItem('authentication');
  } catch (error) {
    // ignore them error
  }
};
