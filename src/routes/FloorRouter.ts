import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { FloorController } from "../controller/FloorController";

export class floorRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        
        this.router.get('/get-single-floor/:floor_id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FloorController.getFloor);
    }


    postRoutes() {
        this.router.post('/get-all-floors', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FloorController.getAllFloors);
        this.router.post('/create-floor', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FloorController.createFloor);
    }

    deleteRoute() {
        this.router.delete('/delete-floor/:floor_id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, FloorController.deleteFloor);
    }
    putRoute() {
        this.router.put('/update-floor', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FloorController.updateFloor);
    }
}


export default new floorRoutes().router;