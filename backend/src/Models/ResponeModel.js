/* eslint-disable */

// module.exports = function(success,data,error)
// {
//     this.success = success;
//     this.data = data;
//     this.error = {
//         name: '',
//         url: ''
//     };
//     return {
//         success : success,
//         data:data,
//         error:error
//     }
// }
class Response {
  constructor(success, data, error) {
    this.success = success;
    this.data = data;
    this.error = {
      name: '',
      url: '',
    };

    this.get = this.get.bind(this);
  }
  get() {
    return {
      success: this.success,
      data: this.data,
      error: this.error,
    };
  }
}

export default Response;
