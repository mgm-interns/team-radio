export const loadAuthenticationState = () => {
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
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authentication', serializedState);
  } catch (error) {
    // ignore them error
  }
};

export const removeAuthenticationState = () => {
  try {
    localStorage.removeItem('authentication');
  } catch (error) {
    // ignore them error
  }
};
