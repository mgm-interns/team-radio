export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const HOST_NAME = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
export const USERNAME_REGEX = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

export default {
  EMAIL_REGEX,
  HOST_NAME,
  USERNAME_REGEX,
};

export const LOCAL_STORAGE_ANONYMOUS_STATIONS = 'local-stations';