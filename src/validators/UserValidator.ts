
import { body, query } from "express-validator";
// import User from '../models/Users';


export class UserValidator {

    static validSignUp() {

        return [
            body('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password can only contain alphanumeric characters and must be between 8 and 20 characters long'),
            body('username', 'Username is required').isString().notEmpty(),
            body('email', 'Please enter a valid email').isEmail().notEmpty()
        ]
    }

    static validCreateUser() {

        return [
            body('username', 'Username is required').isString().notEmpty(),
            body('email', 'Please enter a valid email').isEmail().notEmpty(),
            body('name', 'Name is required').isString().notEmpty(),
            body('district_id', 'District is required').notEmpty(),
            body('taluka_id', 'Taluka is required').notEmpty(),
            body('grampanchayat_id', 'Grampanchayat is required').notEmpty(),
            body('gatgrampanchayat_id', 'Gatgrampanchayat is required').notEmpty(),
            body('password', 'Password is required').isAlphanumeric().notEmpty().isLength({ min: 8, max: 20 }).withMessage('Password can only contain alphanumeric characters and must be between 8 and 20 characters long'),
        ]
    }


    // static loginVerify() {
    //     return [
    //         body('password', 'Password is required').notEmpty(),
    //         body('email', 'email is required').notEmpty().custom((email, { req }) => {
    //             return User.findOne({ email: email }).then(user => {
    //                 if (user) {
    //                     req.user = user;
    //                     return true
    //                 } else {
    //                     throw new Error("User does not exits");
    //                 }
    //             });
    //         })

    //     ]
    // }

    static verifyUser() {

        return [body('username', 'Verification token is required').isString()]
    }

    static postVerify() {
        try {

            return [


                body('post', 'post is required').notEmpty(),
                body('post_description', 'post description is required').notEmpty(),
                body('content_type', 'content type is required').notEmpty(),
                body('posted_by', 'posted by is required').notEmpty()

            ]
        } catch (e) {
            console.log(e);
        }

    }




}