import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

export class Exception extends Error {
  public statusCodeText: string;
  constructor(message: string = 'Unknown exception', public readonly statusCode: number = INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCodeText = getStatusText(statusCode);
  }
}
