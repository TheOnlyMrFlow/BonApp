const http = require('http');
const app = require('./app');

const config = require('./config');

// const dotenv = require('dotenv');
// dotenv.config();




const server = http.createServer(app);

server.listen(config.port || 8080);

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });


