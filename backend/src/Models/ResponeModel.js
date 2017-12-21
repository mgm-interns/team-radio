
class Response {
 
  constructor(success, data, error) {
    this.success = success;
    this.data = data;
    this.error = error;

    this.get = this.get.bind(this);
  }
  get() {
    return {
      success: this.success,
      data: this.data,
      error: this.error
    };
  }
}

export default Response;
