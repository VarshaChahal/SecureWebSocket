const WebSocket = require("ws");
const https = require('http');

//Add certificates and use wss protocol in a real world scenario
//Hard code the url of the websockets endpoint
//do not use user controllable data into the websocket url
//check origin against a whitelist: make sure the origin you are seeing is the one you expect
//Use CSRF tokens for sensitive data/actions
//Try to avoid session handling or access within the websocket protocol, handle it separately
//Use rate limiting: keep track of the clients websockets to avoid too many connection attempts by the client


//websocket using http server
const server = https.createServer();

const wsServer1 =  new WebSocket.Server({ noServer: true });
//const wsServer2 =  new WebSocket.Server({ noServer: true });


server.on('upgrade', (request, socket, head) => {
    console.log("upgrade request: ", request.rawHeaders);
    

    //socket.destory({errorCode, reason});

    wsServer1.handleUpgrade(request, socket, head, (socket) => {
        wsServer1.emit('connection', socket, request);
    });
});

wsServer1.on('connection', (socket,request) => {
   // console.log("on connecgtion function: ", socket.rawHeaders);
   //request.accept('null', request.origin); //check the origin here

   socket.on('open', () => {
        console.log("connection opened");   
    });

    socket.on('close', () => {
        console.log("connection closed");
    });

    socket.on('message', (message) => {
        wsServer1.clients.forEach((client) => {
            console.log("websocket server clients");
        })
        console.log("received message from client: ", message.toString());
        socket.send("hey there! you can have your message back: "+ message.toString());
    }); 
});


server.listen(8085);

//What does a 'READY' message from client to server mean???

//TODO:
/*
    Keep track of websocket client. you don't want to do handshake multiple times for the client. ex: sessions
    ex: table of usernames with the swebsocket.
*/


//NOTES:
/*    websocket objects are cross origin by nature. Use the origin header to decide whether to listen to the client or not.
      Origin header can be spoofed by a proxy.

      Close connection:
          socket.close([code], [reason]);
          response codes: 1000, 1006, 1009, ...

    Websocket server can be run in parallel with the http server:
        http server:  https://example.com
        websocket server: wss://websocket.example.com
*/
