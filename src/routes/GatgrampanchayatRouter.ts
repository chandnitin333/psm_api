import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { GatGramPanchayatController } from "../controller/GatGramPanchayatController";

export class gatgrampanchayatRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }

    getRoutes() {
        this.router.get('/get-single-gat-gram-panchayat', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,GatGramPanchayatController.getGatGramPanchayat);
    }

    postRoutes() {
         this.router.post('/get-all-gat-gram-panchayat', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, GatGramPanchayatController.getAllGatGramPanchayat);
         this.router.post('/create-gat-gram-panchayat', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.createGatGramPanchayat);
         this.router.post('/get-grampanchayat-list-by-taluka-id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.getGrampanchayatByTalikaId);
    }

    deleteRoute() {
        this.router.delete('/delete-gat-gram-panchayat', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.deleteGatGramPanchayat);
    }
    putRoute() {
        this.router.put('/update-gat-gram-panchayat', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GatGramPanchayatController.updateGatGramPanchayat);
    }
}


export default new gatgrampanchayatRoutes().router;