const CLIENT_PREFIX = 'CLIENT:';
const SERVER_PREFIX = 'SERVER:';

const REQUEST_POSTFIX = '_REQUEST';
const SUCCESS_POSTFIX = '_SUCCESS';
const FAILURE_POSTFIX = '_FAILURE';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

class SocketRequest {
  constructor({ type }) {
    this.type = type;

    this.getAction = this.getAction.bind(this);
    this.getReducer = this.getReducer.bind(this);
  }

  getTypeRequest() {
    return `${CLIENT_PREFIX}${this.type}${REQUEST_POSTFIX}`;
  }

  getTypeSuccess() {
    return `${SERVER_PREFIX}${this.type}${SUCCESS_POSTFIX}`;
  }

  getTypeFailure() {
    return `${SERVER_PREFIX}${this.type}${FAILURE_POSTFIX}`;
  }

  getAction() {}

  getReducer() {}
}

export default SocketRequest;
