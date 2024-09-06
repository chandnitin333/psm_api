import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { othertaxController } from "../controller/OtherTaxController";
import { AnnualTaxController } from "../controller/AnnualTaxController";

export class annualTaxRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }

    getRoutes() {
        this.router.get('/get-single-annual-tax/:id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate,AnnualTaxController.getAnnualTax);
    }

    postRoutes() {
         this.router.post('/get-all-annual-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, AnnualTaxController.getAllAnnualTax);
         this.router.post('/create-annual-tax', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, AnnualTaxController.createAnnualTax);
    }

    deleteRoute() {
        this.router.delete('/delete-complete-annual-tax/:id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, AnnualTaxController.deleteCompleteAnnualTax);
        this.router.delete('/delete-annual-tax-rates/:id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, AnnualTaxController.deleteSingleAnnualTaxRates);
    }
    putRoute() {
        this.router.put('/update-annual-tax-rates', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, AnnualTaxController.updateAnnualTax);
    }
}


export default new annualTaxRoutes().router;