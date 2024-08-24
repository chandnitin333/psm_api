import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
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
       
        this.router.get('/get-single-taluka', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,TalukaController.getTaluka);
        // this.router.get('/districts', DistrictController.getAllDistricts);
    }


    postRoutes() {
         this.router.post('/talukas', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, TalukaController.getAllTaluka);
         this.router.post('/create-taluka', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, TalukaController.createTaluka);
    }

    deleteRoute() {
        this.router.delete('/delete-taluka', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, TalukaController.deleteTaluka);
    }
    putRoute() {
        this.router.put('/update-taluka', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, TalukaController.updateTaluka);
    }
}


export default new talukaRoutes().router;