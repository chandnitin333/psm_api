import { Router } from "express";
import { UserController } from "../controller/UserController";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";

export class userRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {

        // this.router.get('/signup',UserValidator.validSignUp(),GlobalMiddleware.checkError,UserController.signUp);
        // this.router.get('/tutorials', TuterialController.getTuterial);

        // this.router.get('/tutorials/:id', TuterialController.getTutDetailsById);
        this.router.get('/users', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.getAllUsers);


    }


    postRoutes() {
        this.router.post('/users', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.getAllUsers);
        this.router.post('/signup', UserController.signUp);
        // this.router.post('/signup', UserValidator.validSignUp(), GlobalMiddleware.checkError, UserController.signUp);
        // this.router.post('/login', UserValidator.loginVerify(), GlobalMiddleware.checkError, UserController.login);

        // this.router.post('/post', upload.array("mediafile"), UserValidator.postVerify(), GlobalMiddleware.checkError, PostController.newPost);
        this.router.get('/test', () => {
        });
        this.router.post('/login', UserController.login);

    }

    deleteRoute() {

    }
    putRoute() {


    }
}


export default new userRoutes().router;