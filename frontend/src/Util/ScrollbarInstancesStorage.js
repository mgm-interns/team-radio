export default class {
  _instances = {};

  get instances() {
    return this._instances;
  }

  getInstance(key) {
    return this._instances[key];
  }

  pushInstance(key, value) {
    this._instances[key] = value;
  }

  removeInstance(key) {
    delete this._instances[key];
  }
}
