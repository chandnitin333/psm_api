import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { GatGramPanchayatController } from "../controller/GatGramPanchayatController";
import { othertaxController } from "../controller/OtherTaxController";

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
        this.router.get('/get-single-other-tax/:id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,othertaxController.getOtherTax);
    }

    postRoutes() {
         this.router.post('/get-all-other-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, othertaxController.getAllOtherTax);
         this.router.post('/create-other-tax', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, othertaxController.createOthertax);
    }

    deleteRoute() {
        this.router.delete('/delete-complete-other-tax/:id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, othertaxController.deleteCompleteOtherTax);
    }
    putRoute() {
        this.router.put('/update-other-tax', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, othertaxController.updateOtherTax);
        this.router.put('/delete-tax-details', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, othertaxController.deleteSingleTaxDetails);
    }
}


export default new othertaxRoutes().router;