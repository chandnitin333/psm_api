
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from '../environments/env';
import { Logger } from '../logger/Logger';
import { getAdminUser } from '../models/adminUser';
import { createUser, deleteUser, getAllUsers, getGatGramPanchayatByGrampanhayatId, getUser, getUsersCount, updateUser } from '../models/Users';
import { ApiResponse } from '../utils/ApiResponse';
import { Utils } from '../utils/Utils';
const logger = new Logger().logger;
export class UserController {

     static async createNewUser(req, res, next) {
        try {
            let { district_id, taluka_id, grampanchayat_id, gatgrampanchayat_id,name, email, username, pwd } = req.body;
            let password = await Utils.encryptPassword(pwd);
            let user: any = await createUser(district_id, taluka_id, grampanchayat_id, gatgrampanchayat_id,name, email, username, password);
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
            let totalCount = (searchText == '') ? await getUsersCount() : Object.keys(users).length;
            let response = ApiResponse.successResponseWithData(res, "Users fetched successfully",  { users, totalCount: totalCount });
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


    static async getSingleUser(req, res, next) {
        try {
            let user = await getUser(parseInt(req.params.userId));
            let response = ApiResponse.successResponseWithData(res, "User fetched successfully", user);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch user", error);
            return response;
        }
    }

    static async updateUser(req, res, next) {
        try {
            let data = req.body;
            console.log(data);
            let body = {
                name: data.name, 
                email: data.email, 
                district_id: data.district_id, 
                taluka_id: data.taluka_id, 
                grampanchayat_id: data.grampanchayat_id, 
                gatgrampanchayat_id: data.gatgrampanchayat_id,
                username: data.username
            };
            let user = await updateUser(parseInt(data.id), body);
            let response = ApiResponse.successResponseWithData(res, "User updated successfully", user);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to update user", error);
            return response;
        }
    }

    static async deleteUser(req, res, next) {
        try {
            let user = await deleteUser(parseInt(req.params.userId));
            let response = ApiResponse.successResponseWithData(res, "User deleted successfully", user);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to delete user", error);
            return response;
        }
    }

    static async getGatGrampanchayatByGrampachayatId(req, res, next) {
        try {
            let data = req.body;
            let gatgrampanchayat = await getGatGramPanchayatByGrampanhayatId(parseInt(data.grampanchayat_id));
            let response = ApiResponse.successResponseWithData(res, "GatGrampanchayat fetched successfully", gatgrampanchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch GatGrampanchayat", error);
            return response;
        }
    }
}