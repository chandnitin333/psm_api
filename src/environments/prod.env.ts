import { Environment } from "./env";

export const ProdEnvironment: Environment = {
    DATABASE_URL: 'mysql://root:Java@123@127.0.0.2:3306/test11',
    JWT_SECRET: 'prod_secret',
};