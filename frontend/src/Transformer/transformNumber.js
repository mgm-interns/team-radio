const millisecondsToTime = (duration = 0) => {
  let milliseconds = parseInt((duration % 1000) / 100);
  let seconds = parseInt((duration / 1000) % 60);
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours > 0 && hours < 10 ? `0${hours}:` : `${hours}:`;
  minutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  milliseconds = milliseconds === 0 ? '' : `.${milliseconds}`;

  if (hours === '0:') {
    hours = '';
  }

  return `${hours}${minutes}${seconds}${milliseconds}`;
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  millisecondsToTime,
  random,
};
