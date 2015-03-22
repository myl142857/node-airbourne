// Device Scanner
// Active connections
(function(){
 var net = require('net');
 var ip = require('ip');
 const SERVICE_PORT = 1337;
 
 var Socket = net.Socket;

 var checkPort = function(port, host, callback) {
    var socket = new Socket(), status = null;
    
    // Socket connection established, port is open
    socket.on('connect', function() {status = 'open';socket.end();});
    socket.setTimeout(1500);// If no response, assume port is not listening
    socket.on('timeout', function() {status = 'closed';socket.destroy();});
    socket.on('error', function(exception) {status = 'closed';});
    socket.on('close', function(exception) {callback(null, status,host,port);});
    
    socket.connect(port, host);
 };
 var ownAddress = ip.address();
 var subnet = ownAddress.split('.').splice(0,3);
 var range = subnet[0] + '.' + subnet[1] + '.' + subnet[2];
 
 var scanLocalNetwork = function(callback){
    // collect an array of open clients
    var clients = [];
    for(var i=1; i <=255; i++){
        var targetIP = range + '.' + i;
        checkPort(SERVICE_PORT, targetIP, function(error, status, host, port){
            if(status == "open"){
                console.log("Reader found: ", host, port, status);
                clients.push(targetIP);
                //
            }
        });
    }
    // Return the client list for further confirmation
    callback(clients);
    return clients;
 };

 // Exposition
 module.exports = scanLocalNetwork;
 console.log('local network scanner loaded');

})();
