
import bodyParser = require("body-parser");
import express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable,setEnvironmentVariables } from './environments/env';
import userRoutes from './routes/UserRouter';
import cors = require('cors');
import fileUpload = require("express-fileupload")



export class Server {
    public app: express.Application = express();
    constructor() {
        // this.connectMongodb();
        this.configBodyParser();
        this.setRoutes();
        this.erorr404Handdler();
        this.handdleErrors();
        setEnvironmentVariables();
    }


    // connectMongodb() {
    //     let databseUrl = getEnvironmentVariable().DATABASE_URL;
    //     mongoose.set("strictQuery", false);
    //     mongoose.connect(databseUrl).then(() => {
    //         console.log("Mongo is connect...!")
    //     }).catch((err) => {
    //         console.log("Error: " + err);
    //     });

    // }

    configBodyParser() {

        this.app.use(bodyParser.urlencoded({ extended: true }));  //qs lybary
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    setRoutes() {
        this.app.use('/api/user/', userRoutes);
    }


    erorr404Handdler() {
        this.app.use((req, res) => {
            res.status(404).send({ message: 'Page Not Found..!', status_code: 404 })
        })
    }

    handdleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({

                message: error.message || 'Something went worng Please try again..!',
                status_code: errorStatus,
                // error_message:error.stack
            })

        })
    }


}