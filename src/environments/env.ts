const dotenv = require('dotenv');
import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";
dotenv.config();

export interface Environment {
    DATABASE_URL: string
    JWT_SECRET: string
}


export function getEnvironmentVariable() {
    console.log("NODE_ENV: " + process.env.NODE_ENV);
    if (process.env.NODE_ENV == 'production') {
        return ProdEnvironment;
    }
    return DevEnvironment;
}


export function setEnvironmentVariables() {
    let evn = getEnvironmentVariable();
    process.env.DATABASE_URL = evn.DATABASE_URL;
    console.log("DATABASE_URL: " + process.env.DATABASE_URL);
}



