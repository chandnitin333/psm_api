import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { GatGramPanchayatController } from "../controller/GatGramPanchayatController";

export class othertaxRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }

    getRoutes() {
        this.router.get('/get-single-other-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,GatGramPanchayatController.getGatGramPanchayat);
    }

    postRoutes() {
         this.router.post('/get-all-other-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, GatGramPanchayatController.getAllGatGramPanchayat);
         this.router.post('/create-other-tax', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.createGatGramPanchayat);
    }

    deleteRoute() {
        this.router.delete('/delete-other-tax', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.deleteGatGramPanchayat);
    }
    putRoute() {
        this.router.put('/update-other-tax', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.updateGatGramPanchayat);
    }
}


export default new othertaxRoutes().router;