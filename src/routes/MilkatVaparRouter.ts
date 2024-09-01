import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { MilkatVaparController } from "../controller/MilkatVaparController";

export class milkatVaparRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes() {
        
        this.router.get('/get-single-milkat-vapar/:milkat_id', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MilkatVaparController.getMilkatVapar);
    }


    postRoutes() {
        this.router.post('/get-all-milkat-vapar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MilkatVaparController.getAllMilkatVapar);
        this.router.post('/create-milkat-vapar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MilkatVaparController.createMilkatVapar);
    }

    deleteRoute() {
        this.router.delete('/delete-milkat-vapar/:milkat_id', GlobalMiddleware.checkError,GlobalMiddleware.authenticate, MilkatVaparController.deleteMilkatVapar);
    }
    putRoute() {
        this.router.put('/update-milkat-vapar', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, MilkatVaparController.updateMilkatVapar);
    }
}


export default new milkatVaparRoutes().router;