import { Environment } from "./env";

export const ProdEnvironment: Environment = {
    DATABASE_URL: 'mysql://root:Java@123@127.0.0.1:3306/psm',
    JWT_SECRET: 'prod_secret',
};