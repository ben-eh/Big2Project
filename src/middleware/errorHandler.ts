import { Request, Response } from 'express';

export default (error: any, request: Request, response: Response, next: any) => {
  // Default status
  let status: number = 500;

  switch (error.message) {
    // Validation errors
    case 'Could not GET token with credentials':
      status = 400;
      break;

    // errors
  //   case 'Email already taken':
  //     status = 400;
  //     break;
  //   case 'Invalid token':
  //     status = 401;
  //     break;
  //   case 'No token provided':
  //     status = 401;
  //     break;
  //   case 'Unauthorized':
  //     status = 403;
  //     break;
  //   case 'Must be same user':
  //     status = 403;
  //     break;
  //   case 'Could not find user':
  //     status = 404;
  //     break;
  //   case 'Could not find settings':
  //     status = 404;
  //     break;
  //   case 'Could not find event':
  //     status = 404;
  //     break;
  }

  // Do any logging here.
  // console.log(error.message);

  return response.status(status).json({
    success: false,
    statusCode: status,
    message: error.message,
  });
};
