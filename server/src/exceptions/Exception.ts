import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

export class Exception extends Error {
  public statusCodeText: string;
  constructor(message?: string, public readonly statusCode: number = INTERNAL_SERVER_ERROR) {
    super();
    this.statusCodeText = getStatusText(statusCode);
    this.message = message || getStatusText(statusCode);
  }
}
