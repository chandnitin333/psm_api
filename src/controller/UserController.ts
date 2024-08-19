
import { createUser } from '../models/Users';
import { ApiResponse } from '../utils/ApiResponse';

import { Logger } from '../logger/Logger';

const logger = new Logger().logger;
export class UserController {

    /**
    * New user signup process and send verification code to user email.
    * @function UserController/signUp
    * @param {object} req  - http request object.
    * @param {object} res  - http response object.
    * @param {object} next - callback function to handle next request.
    */

    static async signUp(req, res, next) {

        try {
            let { name, email } = req.body;
            let user: any = await createUser(name, email);
            let response = ApiResponse.successResponse(res, "User created successfully");
            return response;
        } catch (error) {
            if (error.code === 'P2002' && error.meta && error.meta.target.includes('User_email_key')) {
               
                let response = ApiResponse.ErrorResponse(res, "Email is already in use", 409);
                return response;
            } else {
                logger.error(`Error in UserController/signUp: ${error}`);
                next(error);
            }

        }
    }


}