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
        this.router.get('/get-signle-user/:userId', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.getSingleUser);
    }


    postRoutes() {
        this.router.post('/users', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.getAllUsers);
        this.router.post('/create-new-user', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.createNewUser);
        this.router.post('/login', UserController.login);
        this.router.post('/get-gat-grampanchayat-list-by-grampanchayat-id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.getGatGrampanchayatByGrampachayatId);
    }

    deleteRoute() {
        this.router.delete('/delete-signle-user/:userId', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.deleteUser);
    }
    putRoute() {
        this.router.put('/update-user', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.updateUser);
    }
}


export default new userRoutes().router;