/**
 * Refer to this Stack Overflow topic
 * https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout
 * @param delay
 * @returns {Promise<any>}
 */
export default (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));
