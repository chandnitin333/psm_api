import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { TaxController } from "../controller/TaxController";

export class taxRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        
        this.router.get('/get-single-tax/:id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, TaxController.getTax);
    }


    postRoutes() {
        this.router.post('/get-all-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, TaxController.getAllTax);
        this.router.post('/create-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, TaxController.createTax);
    }

    deleteRoute() {
        this.router.delete('/delete-tax/:id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, TaxController.deleteTax);
    }
    putRoute() {
        this.router.put('/update-tax', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, TaxController.updateTax);
    }
}


export default new taxRoutes().router;