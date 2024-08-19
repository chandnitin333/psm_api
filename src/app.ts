import {Server} from './server';

let server = new Server().app;

let port =4444;

server.listen(port,()=>{
        console.log(`Server Listen port :`,port)
})  