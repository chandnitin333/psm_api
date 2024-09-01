import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { MalmattechePrakarController } from "../controller/MalmattechePrakarController";

export class malmattechePrakarRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        this.router.get('/get-all-malmatteche-prakar-ddl-list', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattechePrakarController.getAllMalmattechePrakarForDDL);
        this.router.get('/get-single-malmatteche-prakar/:mal_prakar_id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattechePrakarController.getMalmattechePrakar);
    }


    postRoutes() {
        this.router.post('/get-all-malmatteche-prakars', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattechePrakarController.getAllMalmattechePrakars);
        this.router.post('/create-malmatteche-prakar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattechePrakarController.createMalmattechePrakar);
    }

    deleteRoute() {
        this.router.delete('/delete-malmatteche-prakar/:mal_prakar_id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, MalmattechePrakarController.deleteMalmattechePrakar);
    }
    putRoute() {
        this.router.put('/update-malmatteche-prakar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MalmattechePrakarController.updateMalmattechePrakar);
    }
}


export default new malmattechePrakarRoutes().router;