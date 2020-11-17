import * as express from "express";
import {createServer, Server} from 'http';
import * as socketIo from 'socket.io';

class App{
    public app: express.Application;
    public server: Server;
    private io: SocketIO.Server;
    public PORT: number = 8100;

    constructor(){
        this.routes();
        this.sockets();
        this.listen();
    }

    routes(){
        this.app = express();
        this.app.route("/").get((req,res)=> {
            res.sendFile(__dirname+'/index.html');
        });
    }

    private sockets(): void {
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);
    }

    private listen():void{
        //conexão ativa
        this.io.on('connection',(socket:any)=>{
            console.log("Nova conexão com id: "+socket.id)
            // mensagem do canal
            socket.on("message", function(msg){
                if (typeof msg == 'string'){
                    //tipo string
                    console.log('Mensagem de texto:'+msg);
                }else{
                    console.log('Objeto:'+msg);
                }
            });
            //desconecção
            socket.on('disconnect',()=>{
                console.log('Usuario desconectado')
            })
        });

        
    }
}
export default new App();