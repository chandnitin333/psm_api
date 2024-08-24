
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from '../environments/env';
import { Logger } from '../logger/Logger';
import { getAdminUser } from '../models/adminUser';
import { createUser, getAllUsers } from '../models/Users';
import { ApiResponse } from '../utils/ApiResponse';
import { Utils } from '../utils/Utils';
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

    static async getAllUsers(req, res, next) {
        try {
            let offset:any = process.env.PAGE_OFFSET || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }
            let users = await getAllUsers(params);
            let response = ApiResponse.successResponseWithData(res, "Users fetched successfully", users);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch users", error);
            return response;
        }
    }



    static async login(req, res, next) {
        let username = req.body.username;

        let user = await getAdminUser(username);
        let password = req.body.password;
        if (user === null) {
            return ApiResponse.unauthorizedResponse(res, "Invalid User", 403);
        }
        try {

            Utils.compairPassword(
                {
                    plainPassword: password,
                    encryptedPassword: user?.password
                }
            ).then((isAuth) => {
                if (isAuth) {
                    const data = {
                        user_id: user?.id,
                        username: user?.username
                    }

                    const token = Jwt.sign(data, getEnvironmentVariable().JWT_SECRET, { expiresIn: '1h' });

                    const respData = {
                        token: token
                    }
                    logger.info("action:User/login", { message: `User : ${user?.username} logged in successfully at ${new Date().toISOString()}` });
                    return ApiResponse.successResponseWithData(res, "Authentication Successful.", respData);
                } else {
                    return ApiResponse.unauthorizedResponse(res, "Invalid User");
                }
            }).catch((err) => {
                logger.error("action:User/login", { message: `Error during authentication: ${err.message}` });
                return ApiResponse.unauthorizedResponse(res, "Authentication Failed.");
            })


        } catch (e) {
            next(e)
        }



    }

}