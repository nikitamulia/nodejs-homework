export class CastError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
export class ValidationError extends CastError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class WrongParamsError extends CastError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class RegistrationConflictError extends CastError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

export class NotAuthorizeError extends CastError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
