
import bodyParser = require("body-parser");
import express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable,setEnvironmentVariables } from './environments/env';
import userRoutes from './routes/UserRouter';
import cors = require('cors');
import DistrictRouter from "./routes/DistrictRouter";
import TalukaRouter from "./routes/TalukaRouter";
// import fileUpload = require("express-fileupload")



export class Server {
    public app: express.Application = express();
    constructor() {
       
        this.configBodyParser();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
        setEnvironmentVariables();
    }


    configBodyParser() {

        this.app.use(bodyParser.urlencoded({ extended: true }));  //qs lybary
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    setRoutes() {
        this.app.use('/api/user/', userRoutes);
        this.app.use('/api/district/', DistrictRouter);
        this.app.use('/api/taluka/', TalukaRouter);
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