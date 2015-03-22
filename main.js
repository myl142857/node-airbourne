(function(){
 var baseAlias = require('./base-alias');
 var scanner = require('./scanner');
 
 // Environment settings
 const SERVICE_PORT = 1337;
 const TRANSMISSION_PORT = 13337;
 
 // Passive (server) side socket
 var net = require('net');
 // 1st server
 var service_server = net.createServer(function(socket) { //'connection' listener
       // use it like Socket.io, but it's a stream object
       console.log('client connected');
       socket.on('end', function() {
            console.log('client disconnected');
            });
       socket.write('hello\r\n');
       // bounce the data back
       socket.pipe(socket);
 });
 service_server.listen(SERVICE_PORT, function() { //'listening' listener
       console.log('service server ready.');
 });
 // 2nd server
 var transmit_server = net.createServer(function(socket){
        //
                                        
 });
 transmit_server.listen(TRANSMISSION_PORT, function(){
        //
        console.log('transmission server ready.');
 });
 
 
  
 var airdrop = {};
 
  
})();
