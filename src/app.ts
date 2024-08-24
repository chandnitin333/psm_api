import {Server} from './server';
const dotenv = require('dotenv');
dotenv.config();

let server = new Server().app;

let port =4444;

server.listen(port,()=>{
        console.log(`Server Listen port :`,port)
})  