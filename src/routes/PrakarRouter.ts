import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { PrakarController } from "../controller/PrakarController";

export class prakarRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        
        this.router.get('/get-single-prakar/:prakar_id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PrakarController.getPrakar);
    }


    postRoutes() {
        this.router.post('/get-all-prakars', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PrakarController.getAllPrakars);
        this.router.post('/create-prakar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PrakarController.createPrakar);
    }

    deleteRoute() {
        this.router.delete('/delete-prakar/:prakar_id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, PrakarController.deletePrakar);
    }
    putRoute() {
        this.router.put('/update-prakar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PrakarController.updatePrakar);
    }
}


export default new prakarRoutes().router;