"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
class App {
    constructor() {
        this.PORT = 8100;
        this.routes();
        this.sockets();
        this.listen();
    }
    routes() {
        this.app = express();
        this.app.route("/").get((req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
    }
    sockets() {
        this.server = http_1.createServer(this.app);
        this.io = require('socket.io')(this.server);
    }
    listen() {
        //conexão ativa
        this.io.on('connection', (socket) => {
            console.log("Nova conexão com id: " + socket.id);
            // mensagem do canal
            socket.on("message", function (msg) {
                if (typeof msg == 'string') {
                    //tipo string
                    console.log('Mensagem de texto:' + msg);
                }
                else {
                    console.log('Objeto:' + msg);
                }
            });
            //desconecção
            socket.on('disconnect', () => {
                console.log('Usuario desconectado');
            });
        });
    }
}
exports.default = new App();
