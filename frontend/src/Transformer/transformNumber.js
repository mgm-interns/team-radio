const millisecondsToTime = (duration = 0) => {
  let milliseconds = parseInt((duration % 1000) / 100, 10);
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  let hours = parseInt(duration / (1000 * 60 * 60), 10);

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
