import { RSAA } from 'redux-api-middleware';

const REQUEST_POSTFIX = '_REQUEST';
const SUCCESS_POSTFIX = '_SUCCESS';
const FAILURE_POSTFIX = '_FAILURE';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_BODY = {};

class HttpRequest {
  constructor({
    type = '',
    method = METHOD_GET,
    headers = {},
    endpoint = '',
    initialData = [],
  }) {
    this.type = type;
    this.method = method;
    this.headers = headers;
    this.endpoint = endpoint;
    this.initialData = initialData;

    // binding
    this.getAction = this.getAction.bind(this);
    this.getReducer = this.getReducer.bind(this);
    this.getTypeRequest = this.getTypeRequest.bind(this);
    this.getTypeSuccess = this.getTypeSuccess.bind(this);
    this.getTypeFailure = this.getTypeFailure.bind(this);
    this._getDefaultAction = this._getDefaultAction.bind(this);
  }

  getTypeRequest() {
    return `${this.type}${REQUEST_POSTFIX}`;
  }

  getTypeSuccess() {
    return `${this.type}${SUCCESS_POSTFIX}`;
  }

  getTypeFailure() {
    return `${this.type}${FAILURE_POSTFIX}`;
  }

  getAction() {
    switch (this.method) {
      case METHOD_GET:
        return () => this._getDefaultAction();
      case METHOD_POST:
        return payload =>
          this._getDefaultAction({
            body: JSON.stringify({
              ...DEFAULT_BODY,
              ...payload,
            }),
          });
      default:
        throw new Error('Invalid Method');
    }
  }

  _getDefaultAction({ ...others }) {
    return {
      [RSAA]: {
        types: [
          this.getTypeRequest(),
          this.getTypeSuccess(),
          this.getTypeFailure(),
        ],
        endpoint: this.endpoint,
        method: this.method,
        headers: {
          ...DEFAULT_HEADERS,
          ...this.headers,
        },
        ...others,
      },
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
            data: this.initialData,
            error: null,
            loading: true,
          };
        case this.getTypeSuccess():
          return {
            ...state,
            data: action.payload.data,
            loading: false,
          };
        case this.getTypeFailure():
          return {
            ...state,
            loading: false,
            error: { ...action.payload },
          };
        default:
          return state;
      }
    };
  }
}

export default HttpRequest;
