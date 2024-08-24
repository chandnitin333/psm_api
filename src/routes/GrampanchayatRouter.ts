import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { GramPanchayatController } from "../controller/GramPanchayatController";

export class grampanchayatRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
       
        this.router.get('/get-single-gram-panchayat', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,GramPanchayatController.getGramPanchayat);
        // this.router.get('/districts', DistrictController.getAllDistricts);
    }


    postRoutes() {
         this.router.post('/all-gram-panchayat', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, GramPanchayatController.getAllGramPanchayat);
         this.router.post('/create-gram-panchayat', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GramPanchayatController.createGramPanchayat);
         this.router.post('/get-taluka-list-by-distict-id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GramPanchayatController.GetTalukaListByDistrictId);
    }

    deleteRoute() {
        this.router.delete('/delete-gram-panchayat', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GramPanchayatController.deleteGramPanchayat);
    }
    putRoute() {
        this.router.put('/update-gram-panchayat', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, GramPanchayatController.updateGramPanchayat);
    }
}


export default new grampanchayatRoutes().router;