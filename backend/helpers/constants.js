export const errorName = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  USER_EXISTS: 'USER_EXISTS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  USER_NOT_FOUND: 'USER_NOT_FOUND'
}

export const errorType = {
  INVALID_EMAIL: {
    type: 'INVALID_EMAIL',
    message: 'User with such email does not exist.',
    statusCode: 404
  },
  INVALID_PASSWORD: {
    type: 'INVALID_PASSWORD',
    message: 'Password is incorrect.',
    statusCode: 400
  },
  USER_EXISTS: {
    type: 'INVALID_EMAIL',
    message: 'User with such email already exists.',
    statusCode: 400
  },
  UNAUTHORIZED: {
    type: 'UNAUTHORIZED',
    message: 'Unauthenticated.',
    statusCode: 401
  },
  USER_NOT_FOUND: {
    type: 'USER_NOT_FOUND',
    message: 'User not found.',
    statusCode: 404
  }
}
