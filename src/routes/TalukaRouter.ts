import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { DistrictController } from "../controller/DistrictController";
import { TalukaController } from "../controller/TalukaController";

export class talukaRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        this.router.get('/talukas', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, TalukaController.getAllTaluka);

        this.router.get('/getSingleTalukaById', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,TalukaController.getTaluka);
        // this.router.get('/districts', DistrictController.getAllDistricts);
    }


    postRoutes() {
        this.router.post('/createTaluka', GlobalMiddleware.checkError, TalukaController.createTaluka);
    }

    deleteRoute() {
        this.router.delete('/deleteTaluka', GlobalMiddleware.checkError, TalukaController.deleteTaluka);
    }
    putRoute() {
        this.router.put('/updateTaluka', GlobalMiddleware.checkError, TalukaController.updateTaluka);
    }
}


export default new talukaRoutes().router;