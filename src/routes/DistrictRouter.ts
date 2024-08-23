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
        

        this.router.get('/get-single-district', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.getDistrict);
        // this.router.get('/districts', DistrictController.getAllDistricts);
        this.router.get('/districts_ddl', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.getAllDistrictForDDL);
    }


    postRoutes() {
        this.router.post('/districts', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.getAllDistricts);
        this.router.post('/create-district', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.createDisrict);
    }

    deleteRoute() {
        this.router.delete('/delete-district', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, DistrictController.deleteDistrict);
    }
    putRoute() {
        this.router.put('/update-district', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, DistrictController.updateDistrict);
    }
}


export default new districtRoutes().router;