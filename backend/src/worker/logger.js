export function log(...params) {
  console.log('---------------- TEAM RADIO WORKER ----------------');
  console.log(...params);
}
export function workerlog(...params) {
  log('[LOG]', ...params);
}
export function workerError(...params) {
  log('[ERR]', ...params);
}
