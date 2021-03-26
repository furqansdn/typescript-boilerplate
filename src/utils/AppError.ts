enum HTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly error?: any;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: HTTPStatusCode, error?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = true;
    if (error) {
      this.error = error;
    }

    Error.captureStackTrace(this);
  }
}

export class ServerError extends AppError {
  constructor(message: string, error?: any) {
    super(message, HTTPStatusCode.INTERNAL_SERVER_ERROR, error);
  }
}

export class HTTPNotFound extends AppError {
  constructor(message: string) {
    super(message, HTTPStatusCode.NOT_FOUND);
  }
}

export class BadRequest extends AppError {
  constructor(message: string) {
    super(message, HTTPStatusCode.BAD_REQUEST);
  }
}
