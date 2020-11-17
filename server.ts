import { Server } from 'http';
import app from './app';
let port: number= 8100;

app.server.listen(port, function () {
    console.log(`server running in" ${port}`);
});