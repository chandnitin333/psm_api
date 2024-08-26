import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { MalmattaController } from "../controller/MalmattaController";

export class malmattaRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        
        this.router.get('/get-single-malmatta/:malmatta_id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattaController.getMalmatta);
    }


    postRoutes() {
        this.router.post('/get-all-malmatta', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattaController.getAllMalmatta);
        this.router.post('/create-malmatta', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattaController.createMalmatta);
    }

    deleteRoute() {
        this.router.delete('/delete-malmatta/:malmatta_id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, MalmattaController.deleteMalmatta);
    }
    putRoute() {
        this.router.put('/update-malmatta', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattaController.updateMalmatta);
    }
}


export default new malmattaRoutes().router;