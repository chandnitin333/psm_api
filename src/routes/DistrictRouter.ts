import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { DistrictController } from "../controller/DistrictController";

export class districtRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        this.router.get('/districts', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.getAllDistricts);

        this.router.get('/getSingleDistrictById', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.getDistrict);
        // this.router.get('/districts', DistrictController.getAllDistricts);
    }


    postRoutes() {
        this.router.post('/createDistrict', GlobalMiddleware.checkError, DistrictController.createDisrict);
    }

    deleteRoute() {
        this.router.delete('/deleteDistrict', GlobalMiddleware.checkError, DistrictController.deleteDistrict);
    }
    putRoute() {
        this.router.put('/updateDistrict', GlobalMiddleware.checkError, DistrictController.updateDistrict);
    }
}


export default new districtRoutes().router;