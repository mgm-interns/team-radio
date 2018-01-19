import sleep from 'Util/sleep';

export const loadAuthenticationState = () => {
  try {
    const serializedState = localStorage.getItem('token');

    if (!serializedState) {
      return undefined;
    }
    return serializedState;
  } catch (error) {
    return error;
  }
};

export const saveAuthenticationState = async state => {
  await sleep();
  try {
    // const serializedState = JSON.stringify(state);
    console.log(state);
    await localStorage.setItem('token', state.token);
    await localStorage.setItem('userId', state.userId);
  } catch (error) {
    console.log(error);
  }
};

export const removeAuthenticationState = async () => {
  await sleep();
  try {
    await localStorage.removeItem('token');
    await localStorage.removeItem('userId');
  } catch (error) {
    console.log(error);
  }
};
