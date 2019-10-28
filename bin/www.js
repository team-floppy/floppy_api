const app = require('../server');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https  = require('https')
const dbConfiguration = require('./config/db');
const port = normalizePort(process.env.PORT || '8080');
const serverType = process.env.servertype;
app.set('port', port);
let server = {};



/**
 * Create Unified server based on the server type environment
 * choose between http and https server.
 */

if (serverType === 'https') {
    let certOptions = {
        key: fs.readFileSync(path.resolve('bin/certs/server.key')),
        cert: fs.readFileSync(path.resolve('bin/certs/server.crt'))
    }
    server = https.createServer(certOptions, app)
}else{
    server = http.createServer(app);
}


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log(`Listening on port  ${port}`)
});
server.on('error', onError);
server.on('listening', onListening);


/**
 * Database configuration
 */
dbConfiguration();


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    // logger.default.info('Listening on ' + bind);
}