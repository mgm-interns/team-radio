const convertNumberToTime = (number = 0) => {
  let seconds = Math.floor(number);
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  if (seconds < 10) seconds = `0${seconds}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  return `${hours}:${minutes}:${seconds}`;
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  convertNumberToTime,
  random,
};
