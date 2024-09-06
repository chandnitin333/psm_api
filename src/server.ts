
import bodyParser = require("body-parser");
import express from 'express';
import DistrictRouter from "./routes/DistrictRouter";
import FloorRouter from "./routes/FloorRouter";
import GatgrampanchayatRouter from "./routes/GatgrampanchayatRouter";
import GrampanchayatRouter from "./routes/GrampanchayatRouter";
import MalmattaRouter from "./routes/MalmattaRouter";
import MalmattechePrakarRouter from "./routes/MalmattechePrakarRouter";
import MilkatVaparRouter from "./routes/MilkatVaparRouter";
import OthertaxRouter from "./routes/Othertax.Router";
import PrakarRouter from "./routes/PrakarRouter";
import TalukaRouter from "./routes/TalukaRouter";
import TaxRouter from "./routes/TaxRouter";
import userRoutes from './routes/UserRouter';
import cors = require('cors');
import AnnualTaxRouter from "./routes/AnnualTax.Router";
const dotenv = require('dotenv');
dotenv.config();
// import fileUpload = require("express-fileupload")



export class Server {
    public app: express.Application = express();
    constructor() {

        this.configBodyParser();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
        // setEnvironmentVariables();
    }


    configBodyParser() {

        this.app.use(bodyParser.urlencoded({ extended: true }));  //qs lybary
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    setRoutes() {
        this.app.use('/api/user/', userRoutes);
        // this.app.use('/api/district/', DistrictRouter);
        // this.app.use('/api/taluka/', TalukaRouter);
        // this.app.use('/api/gram-panchayat/', GrampanchayatRouter);
        this.app.use('/api/admin/', [DistrictRouter, TalukaRouter, GrampanchayatRouter, GatgrampanchayatRouter, FloorRouter, PrakarRouter, MalmattechePrakarRouter, MilkatVaparRouter, MalmattaRouter, TaxRouter, OthertaxRouter, AnnualTaxRouter]);
    }


    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).send({ message: 'Page Not Found..!', status_code: 404 })
        })
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({

                message: error.message || 'Something went wrong Please try again..!',
                status_code: errorStatus,
                // error_message:error.stack
            })

        })
    }


}