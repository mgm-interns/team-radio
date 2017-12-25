const CLIENT_PREFIX = 'CLIENT:';
const SERVER_PREFIX = 'SERVER:';

const REQUEST_POSTFIX = '_REQUEST';
const SUCCESS_POSTFIX = '_SUCCESS';
const FAILURE_POSTFIX = '_FAILURE';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

class SocketRequest {
  constructor({ type = '', method = METHOD_GET, initialData = [] }) {
    this.type = type;
    this.method = method;
    this.initialData = initialData;

    this.getAction = this.getAction.bind(this);
    this.getReducer = this.getReducer.bind(this);
    this.getTypeRequest = this.getTypeRequest.bind(this);
    this.getTypeSuccess = this.getTypeSuccess.bind(this);
    this.getTypeFailure = this.getTypeFailure.bind(this);
    this._getDefaultAction = this._getDefaultAction.bind(this);
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

  getAction() {
    switch (this.type) {
      case METHOD_GET:
        return () => this._getDefaultAction();
      case METHOD_POST:
        return payload => this._getDefaultAction({ payload });
      default:
        throw new Error('Invalid Method');
    }
  }

  _getDefaultAction({ ...others }) {
    return {
      type: this.getTypeRequest(),
      ...others,
    };
  }

  getReducer() {
    const INITIAL_STATE = {
      data: this.initialData,
      loading: false,
      error: null,
    };
    return (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case this.getTypeRequest():
          return {
            ...state,
            data: this.initialData,
            loading: true,
          };
        case this.getTypeSuccess():
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case this.getTypeFailure():
          return {
            data: this.initialData,
            loading: false,
            error: action.payload,
          };
        default:
          return state;
      }
    };
  }
}

export default SocketRequest;
