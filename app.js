const express = require('express');
const app = express();

const morgan = require('morgan');

const cors = require("cors");

const config = require('./config');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mrflow:' + config.mongo_pwd + '@cluster0-4iqxv.mongodb.net/test?retryWrites=true',  {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// 'mongodb://MrFlow:' + process.env.MONGO_ATLAS_PASSWORD + '@code-shirts-shard-00-00-s2vos.mongodb.net:27017,code-shirts-shard-00-01-s2vos.mongodb.net:27017,code-shirts-shard-00-02-s2vos.mongodb.net:27017/test?ssl=true&replicaSet=code-shirts-shard-0&authSource=admin'


// 'mongodb://mrflow:' + process.env.MONGO_ATLAS_PASSWORD + '@cluster0-4iqxv.mongodb.net/test?retryWrites=true'

const routes = require('./Routes/routes');


app.use(morgan('dev'));

app.use(cors());



app.use(routes);

app.use('/', (req, res, next) => {    
    res.status(200).json({});
});

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app; 
