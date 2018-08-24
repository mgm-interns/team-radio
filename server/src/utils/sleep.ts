export const sleep = (timeout: number = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
